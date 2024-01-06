Please answer the following questions about your work:

0 - What language did you program in?

TypeScript

1 - Have you manually tested the SDK?

Yes

2 - Did you add a test suite? If so, how will we use it? If not, why?

Yes, run `npm run test`

3 - Did you use any 3rd party library? Why did you use it? What are the tradeoffs?

Yes, I used:

- Jest for testing
- @typescript-eslint/eslint-plugin" and "@typescript-eslint/parser: to enable ESLInt to support Typescript. I used this package to keep my code clean syntactically
- prettier: I used this package to ensure consistency in my code stule
- ts-jest: this is a Jest transformer acting as a bridge between Jest and Typescript
- axios: I created a custom AxiosHttpClient to work with my HTTPClient and used axios to make API calls in my function. While axios is very rich in features compared to fetch, this increases the budnle size of the project as it is an external library
- dotenv: inside my testProject to access the authorization token I set in my .env file

4 - Do you feel this SDK makes it easier to interact with the API?

Yes

5 - If you had more time, what else would you add?

- I would consider caching responses, especially related to endpoints where I expect to receive a lot of data. I would need to think about the architecture and necessity of this based on how people would hypothetically use the SDK

- I would implement pagination for data returned from some endpoints: /quote specificially as this returns more sizeable data, this would decrease the server's response time. I would need to consider whether or not the amount of data returned from this endpoint justifies implementing pagination

6 - What would you change in your current SDK solution?

- I have reservations about generalizing getFilteredMovie to work using both the /quote and /movie endpoint. I envisioned a scenario where it might become useful at some point to have the function set up this way, but I didn't fully generalize the code to handle all the parameters one could hypothetically use to filter output from the /quote endpoint. I would either change the name of this function to reflect it's true nature or just limit it to work purely on the /movie endpoint

7 - On a scale of 1 to 10 (10 being the highest), how would you rate this solution?

8

8 - Anything else we should keep in mind when we evaluate the project?

No
