import camelize from 'camelize';

const getYear = (date) => {
  return date.split('-')[0];
};

const getRating = (rating) => {
  return (rating * 10).toString() + '%';
};

export const tvTransform = (results = []) => {
  const mappedResults = results.map((show) => {
    return {
      ...show,
      year: getYear(show.first_air_date),
      rating: getRating(show.vote_average),
    };
  });

  return camelize(mappedResults);
};

export const combineTvInfo = (details, credits) => {
  const show = {
    ...details,
    ...credits,
  };
  return camelize(show);
};
