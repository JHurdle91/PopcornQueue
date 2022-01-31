import camelize from 'camelize';

const getYear = (date) => {
  return date.split('-')[0];
};

const getRating = (rating) => {
  return (rating * 10).toString() + '%';
};

export const moviesTransform = (results = []) => {
  const mappedResults = results.map((movie) => {
    return {
      ...movie,
      year: getYear(movie.release_date),
      rating: getRating(movie.vote_average),
    };
  });

  return camelize(mappedResults);
};
