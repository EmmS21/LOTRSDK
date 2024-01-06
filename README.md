## TypeScript SDK for Lord of the Rings API

This TypeScript SDK provides a streamlines option to interact with the:

- /movie
- /movie/${id}
- /movie/${id}/quote
- /quote
- /quote/${id}

endpoints and filtering functionality enabling users to filter Movies and Quotes using these parameters:

- 'lessThan'
- 'greaterThan'
- 'lessThanOrEqual'
- 'greaterThanOrEqual'
- 'regex'
- 'negateMatch'

# Installation

To run this please follow these instructions:

- run `npm i` to install all SDK dependencies
- run `npm run build` - this will ocompile the typescript code to Javascript and generate declaration files
- run `npm link` to create a symbolic link between the SDK and `testProject`
- cd into the `testProject` folder and run `npm i` to install all dependencies
- run `npm link lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e`. This will complete the process of linking the SDK locally to the testProject
- run `npm run build` in `testProject`
- set up a .env file with an authorization token to access the Lord of the Rings endpoint
- uncomment the functions you would like to test and run `npm run start`

# Getting Started

Once you have completed the install process, to get started and interact with the SDK follow this process

Import the SDK function you need

Example
`import { getBookData } from 'lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e';`

# API Reference

`getMovieData()`

This function retrieves all movies from the /movie endpoint in the Lord of the Rings API. The function returns a promise that resolves to the book data as a JSON

Example Usage:

```
   import { getMovieData } from 'lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e';

   async function fetchMovies() {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        const data = await getMovieData
        return data
   }

   fetchMovies()
```

`getMovieById`

This function retrieves a movie using a valid id parameter. This ID must be a string

Example Usage:

```
    import { getMovieById } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    async function fetchMovieById(id) {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        const data = await getMovieById(id);
        return data
    }

    fetchMoviesById('5cd95395de30eff6ebccde5d')
```

`getMoviesQuotesById`

This function retrieves a quotes from a movie based on a valid movie ID. This returns quotes only for movies related to the Lord of the Rings trilogy

Example Usage:

```
    import { getMovieQuotesById } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    async function fetchMovieQuotesById() {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        let movieId = "5cd95395de30eff6ebccde5d";
        const data = await getMovieQuotesById(movieId);
        return data
    }
    fetchMovieQuotesById()
```

`getQuotes`

This function returns quotes from movies returned through the Lord of the Rings /quote endpoint

Example Usage:

```
    import { getQuotes } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    async function fetchQuotes() {
        const data = await getQuotes();
        return data
    }
```

`getQuotesById`

This function retrieves a quote based on the ID associated with the quote

Example Usage:

```
    import { getQuotesById } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    async function fetchQuotesById() {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        const quoteId = "5cd96e05de30eff6ebcce7ea";
        const data = await getQuotesById(quoteId);
        return data
    }
```

`getFilteredMovie`

While this function is generalized to work for both Movies and Quotes, currently you would realistically only use this function to filter movies as there is limited information to imagine the need to filter Quotes. The function has been generalized to work for both endpoints to proactively enable users to use this filter function for quotes if and when the /quote endpoint is populated with more data (eg. if this SDK is extended to handle the /character endpoint it could be feasible to filter quotes based on a character's name, gender or race)

Example Usage:

```
    import { getFilteredMovie } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    //filter by single parameter
    async function fetchFilteredMovies() {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        const filterArgs: FilteredMovie = {
            name: {
            value: "The Return of the King",
            action: "match",
            },
        };
        const data = await getFilteredMovie(undefined, filterArgs);
        return data
    }

    fetchFilteredMovies()

    //filter by multiple parameters
    async function fetchFilteredQuotesMultipleParams() {
        const authToken = process.env.AUTH_TOKEN;
        setAuthToken(authToken as string);
        const filterArgs: FilteredMovie = {
            runtimeInMinutes: {
            value: 170,
            action: "greaterThan",
            },
            academyAwardWins: {
            value: 5,
            action: "lessThan",
            },
        };
        const data = await getFilteredMovie(undefined, filterArgs);
        return data;
    }

    fetchFilteredQuotesMultipleParams()
```

`setAuthToken`

This is a function to set your authorization token

Example Usage:

```
    import { setAuthToken } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    setAuthToken('1234' as string)
```

`getAuthToken`

This is a function to return the value of the authorization token after you have set it's value

Example Usage:

```
    import { getAuthToken } from "lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e";

    console.log(getAuthToken())
```

# Error Handling

Errors in the SDK are handled using the `handleAxiosError` function in the SDK.

This function categorizes and creates instances of these errors:

- `ApiError`: relates to all API related errors. This includes; invalid request, common API responses (missing resources) but excludes Authentication and Network errors
- `AuthorizationError`: relates to errors pertaining to incorrect, missing or incorrectly passed authorization token
- `NetworkError`: This could indicate issues pertaining to connectivity issues and related errors
- `UnexpectedStatusCodeError`: This relates to erros that are not explicity handled or just unexpected

# Testing

In order to run tests on this SDK, after you have completed the installation process run the command `npm run test`.

# Configuration

The SDK is preconfigured with the MOVIE_URL and QUOTE_URL defined in the `config.ts` file.

Example Usage:

```
    // config.ts
    export const apiUrl = "http://127.0.0.1:8000;

```
