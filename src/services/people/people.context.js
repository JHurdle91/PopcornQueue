import React, { createContext, useEffect, useState } from 'react';

import { GetPersonCredits } from '../../api/people.api';
import { GetPersonDetails } from '../../api/people.api';
import { combinePersonInfo } from './people.service';
import { peopleTransform } from './people.service';

export const PeopleContext = createContext();

export const PeopleContextProvider = ({ children }) => {
  const [personDetails, setPersonDetails] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);
  const [person, setPerson] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const retrievePersonCredits = async (id) => {
    setIsLoadingCredits(true);
    setPersonCredits(null);
    try {
      let pc = await GetPersonCredits(id);
      setPersonCredits(pc);
    } catch (err) {
      setError(err);
    }
    setIsLoadingCredits(false);
  };

  const retrievePersonDetails = async (id) => {
    setIsLoadingDetails(true);
    setPersonDetails(null);
    try {
      let pd = await GetPersonDetails(id);
      pd = peopleTransform([pd])[0];
      setPersonDetails(pd);
    } catch (err) {
      setError(err);
    }
    setIsLoadingDetails(false);
  };

  const onChangeId = async (id) => {
    setPerson(null);
    await retrievePersonDetails(id);
    await retrievePersonCredits(id);
  };

  const onClearPerson = () => {
    setPersonDetails(null);
    setPersonCredits(null);
    setPerson(null);
  };

  useEffect(() => {
    if (!isLoadingDetails && !isLoadingCredits) {
      setPerson(combinePersonInfo(personDetails, personCredits));
    }
  }, [personDetails, personCredits, isLoadingDetails, isLoadingCredits]);

  return (
    <PeopleContext.Provider
      value={{
        isLoadingDetails,
        isLoadingCredits,
        error,
        personDetails,
        changeId: onChangeId,
        person,
        clearPerson: onClearPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
