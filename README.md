This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## To Get it Running

First Install dependencies from npm :
```bash
    npn run install
```
Second, run the development server:

1) Without Cypress Testing
```bash
    npm run dev
```
2) With Cypress Testing

    For CLI mode : 
        ```bash
        npm run dev-test-ci
        ```

    For Ui browser Mode
        ```bash
        npm run dev-test-open
        ```


Open [http://localhost:3024](http://localhost:3024) with your browser to see the result.


## libraries 

1) Tailwind
2) Redux-Toolkit
3) TypeScript
4) React.js
5) Cypress Testing

## Project Entry Point 

    pages/index.tsx

## API routes 
Created api to fetch formatted data can be accessed on [http://localhost:3024/api/search_data](http://localhost:3024/api/search_data). This endpoint api code can be found in `pages/api/search_data.ts`.

## Components 
1) Auto-complete search bar 
2) Cards to display Books details  


## Feature developed :

1) API created to fetch data from nextjs server , along with error handling
2) Auto-Complete search box  : searched summary , based on frequency of query occurence , higher frequency title will be shown on top.
3) Implemented debouncing to reduce unnecessary heavy search calls to server.
4) Implemented Pagination to reduce initial UI load , for better user experience. 
5) Use Tailwind css for styling (4 cards in each row )
6) test cases for entering to "new" key in search box and validate the incomming api response. 



## Note
Check api call in Network tab in console for formatted data

![Alt text]([image link](https://github.com/kalpitzz/e6Data/blob/42c2296b2f3d77cc6a54c271bc585ddac5e9e08a/public/s1.png))
