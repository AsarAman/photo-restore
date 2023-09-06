[Restore your photos now](https://photo-enhancement.vercel.app/)

## How it works
It uses an ML model from the Applied Research Center called [GFPGAN](https://github.com/TencentARC/GFPGAN) on [Replicate](https://replicate.com/) to restore face photos. This application gives you the ability to upload any photo, which will send it through this ML Model using a Next.js API route, and return your restored photo.

## Running locally

## Cloning the repository the local machine.

```bash
git clone

```

## Creating a account on Replicate to get an API key.

1. Go to [Replicate](https://replicate.com/) to make an account.
2. Click on your profile picture in the top right corner, and click on "Dashboard".
3. Click on "Account" in the navbar. And, here you can find your API token, copy it.

## Storing API key in .env file.
Create a file in root directory of project with env. And store your API key in it, as shown in the .example.env file.

If you'd also like to do rate limiting, create an account on UpStash, create a Redis database, and populate the two environment variables in .env as well. If you don't want to do rate limiting, you don't need to make any changes.

## Installing the dependencies.

```bash
npm install
```

## Running the application.
Then, run the application in the command line and it will be available at http://localhost:3000.

```bash
npm run dev
```

## One-Click Deploy

Deploy to [Vercel](https://vercel.com)
