import camelize from 'camelize';

const getYear = (date) => {
  return date.split('-')[0];
};

const getRating = (rating) => {
  return (rating * 10).toString() + '%';
};

export const tvTransform = (results = []) => {
  const mappedResults = results.map((series) => {
    return {
      ...series,
      year: getYear(series.first_air_date),
      rating: getRating(series.vote_average),
    };
  });

  return camelize(mappedResults);
};

export const combineTvInfo = (details, credits) => {
  const series = {
    ...details,
    ...credits,
  };
  return camelize(series);
};
