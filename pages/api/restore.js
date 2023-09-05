import Replicate from "replicate";
import { Ratelimit } from "@upstash/ratelimit";
import redis from "../../utils/redis";
import { getServerSession } from "next-auth/next";

// Create a new ratelimiter, that allows 5 per day
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

//check for user login
const checkUserLogin = async (req, res) => {
  const session = await getServerSession(req, res);

  return session;
};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Check if user is logged in

      const session = await checkUserLogin(req, res);
      if (!session || !session.user) {
        return res.status(401).json({ message: "Login to upload." });
      }

      // Rate Limiting by user email
      if (ratelimit) {
        const identifier = session.user.email;
        const result = await ratelimit.limit(identifier);
        res.setHeader("X-RateLimit-Limit", result.limit);
        res.setHeader("X-RateLimit-Remaining", result.remaining);
        console.log("res", result);
        // Calcualte the remaining time until generations are reset
        const diff = Math.abs(
          new Date(result.reset).getTime() - new Date().getTime()
        );

        const hours = Math.floor(diff / 1000 / 60 / 60);

        const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

        if (!result.success) {
          return res.status(429).json({
            message: `Request limit exceeded. Your generations will renew in 24 hours.`,
          });
        }
      }

      const { data } = req.body;
      const output = await replicate.run(
        "tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
        {
          input: {
            img: data,
          },
        }
      );
      if (output) {
        return res.status(200).json({ success: true, data: output });
      } else {
        return res
          .status(503)
          .json({
            success: false,
            data: [],
            message: "Cannot fullfil your request. Please try again later.",
          });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "The request cannot be proceeded at the moment." });
    }
  }
  if (req.method === "GET") {
    try {
      const session = await checkUserLogin(req, res);
      if (!session || !session.user) {
        return res
          .status(401)
          .json({ message: "You are not authorized to access this route" });
      }

      // Query the redis database by email to get the number of generations left
      const identifier = session.user.email;
      const windowDuration = 24 * 60 * 60 * 1000;
      const bucket = Math.floor(Date.now() / windowDuration);

      const usedGenerations =
        (await redis.get(`@upstash/ratelimit:${identifier}:${bucket}`)) || 0;

      // it can return null and it also returns the number of generations the user has done, not the number they have left

      let remainingGenerations = 5 - Number(usedGenerations);
      if (remainingGenerations < 0) remainingGenerations = 0;

      return res.status(200).json({ remainingGenerations });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Cannot fetch at the moment. Try again." });
    }
  }
}

export default handler;
