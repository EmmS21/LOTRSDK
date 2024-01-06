import {
  getMovieData,
  setAuthToken,
  getMovieById,
  getMovieQuotesById,
  getQuotes,
  getQuotesById,
  getFilteredMovie,
} from 'lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e';
import {
  FilteredMovie,
  Movie,
} from 'lib-lab-take-home-project-107ded5a27304c5586494092b40b1a4e/dist/commons/types';
import dotenv from 'dotenv';

dotenv.config();

//testing function to fetch all movies
async function fetchMovie() {
  try {
    const authToken = process.env.AUTH_TOKEN;
    setAuthToken(authToken as string);
    const data = await getMovieData();
    //expecting output to return all movies
    console.log('fetchData', data);
    if (data && data.docs) {
      let firstRes = data.docs[0];
      fetchMovieById(firstRes);
    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// fetchMovie();

//testing function to fetch a movie by ID
async function fetchMovieById(firstRes: Movie) {
  const authToken = process.env.AUTH_TOKEN;
  setAuthToken(authToken as string);
  let movieId = firstRes._id;
  const data = await getMovieById(movieId);
  console.log('fetchMovieById', data);
}

//testing function to fetch movie quotes by ID
async function fetchMovieeQuotesById() {
  const authToken = process.env.AUTH_TOKEN;
  setAuthToken(authToken as string);
  let movieId = '5cd95395de30eff6ebccde5d';
  const data = await getMovieQuotesById(movieId);
  console.log('fetchMovieQuotesById', data);
}

// fetchMovieeQuotesById();
//testing function to fetch quotes
async function fetchQuotes() {
  const data = await getQuotes();
  console.log('quotes', data);
}

// fetchQuotes();

//testing function to fetch quotes by ID
async function fetchQuotesById() {
  const authToken = process.env.AUTH_TOKEN;
  setAuthToken(authToken as string);
  const quoteId = '5cd96e05de30eff6ebcce7ea';
  const data = await getQuotesById(quoteId);
  console.log('fetchQuotesById', data);
}

// fetchQuotesById();

//testing function to fetch movies filtered by one parameter
async function fetchFilteredMovies() {
  const authToken = process.env.AUTH_TOKEN;
  setAuthToken(authToken as string);
  const filterArgs: FilteredMovie = {
    name: {
      value: 'The Return of the King',
      action: 'match',
    },
  };
  const data = await getFilteredMovie(undefined, filterArgs);
  console.log('fetchFilteredMovies', data);
}

// fetchFilteredMovies();

//testing using getFilterdMovie function with multiple filter params
async function fetchFilteredQuotesMultipleParams() {
  const authToken = process.env.AUTH_TOKEN;
  setAuthToken(authToken as string);
  const filterArgs: FilteredMovie = {
    runtimeInMinutes: {
      value: 170,
      action: 'greaterThan',
    },
    academyAwardWins: {
      value: 5,
      action: 'lessThan',
    },
  };
  const data = await getFilteredMovie(undefined, filterArgs);
  console.log('fetchFilteredQuotesMultipleParams', data);
}

// fetchFilteredQuotesMultipleParams();

// should return 401 Authorization error
async function testingErrorResp() {
  const data = await getMovieData();
  //expecting output to return all movies
}

// testingErrorResp();
