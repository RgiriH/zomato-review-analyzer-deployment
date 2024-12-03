import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>BITES&BRIEF</title>
        <meta name="discription" content="BITES&BRIEF is a full-stack application developed using Node.js and React to automate the extraction and analysis of customer reviews from platforms like Zomato. It features AI-powered sentiment analysis and an interactive interface for restaurant owners." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
