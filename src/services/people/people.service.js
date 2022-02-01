import camelize from 'camelize';

const getAge = (birthday, deathday) => {
  const b = birthday.split('-');
  const birthDate = new Date(b[0], b[1] - 1, b[2]);
  let date = new Date();

  if (deathday) {
    const d = deathday.split('-');
    const deathDate = new Date(d[0], d[1] - 1, d[2]);
    date = deathDate;
  }

  let age = date.getFullYear() - birthDate.getFullYear();
  const m = date.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const peopleTransform = (results = []) => {
  const mappedResults = results.map((person) => {
    return {
      ...person,
      age: getAge(person.birthday, person.deathday),
    };
  });

  return camelize(mappedResults);
};

export const combinePersonInfo = (details, credits) => {
  const person = {
    ...details,
    ...credits,
  };
  const camelizedPerson = camelize(person);
  return camelizedPerson;
};
