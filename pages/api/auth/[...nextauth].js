import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
     
      // ...add more providers here
    ],
  })



//976441324367-2cfqp4eohug368k0751chb7h7drlk03e.apps.googleusercontent.com

//client secret
//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

//https://key-viper-32930.upstash.io

//AYCiASQgMDYyMjViMmEtNTA4Ny00MDFjLTg1ZTMtODM3NmM4OTRlZTlhNjM0MDQ2ODdjODA5NDA5NjlkMTA0NTRlOTU1NjU4Y2Y=
