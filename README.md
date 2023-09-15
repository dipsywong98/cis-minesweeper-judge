# Minesweeper

This challenge aims to test participants problem-solving skills and code reading skills in digging the solution in minesweeper UI source code provided. I expect participants can read through the source code of the minesweeper UI to find out that piece of code that does the decoding of Minesweeper id, which the id decodes into dimensions and a bitmask, and the bitmask can be converted into mine positions.

Other possible solutions include intercepting the POST request and waiting for manual input, then you can solve the map manually or run scripts on the browser to calculate, participants may also build a UI to facilitate it to complete it withing the time limit.

Using headless Chrome to fully automate the UI interaction is possible, but not cost-efficient as competition time is limited.

Any other methods are welcomed as long as it solves it problem~

Participants can gain 5% easily if they notice one of the test cases is hardcoded.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
