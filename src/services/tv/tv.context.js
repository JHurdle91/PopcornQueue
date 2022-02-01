import React, { createContext, useEffect, useState } from 'react';

import { GetPopularShows } from '../../api/tv.api';
import { GetShowCredits } from '../../api/tv.api';
import { GetShowDetails } from '../../api/tv.api';
import { combineTvInfo } from './tv.service';
import { tvTransform } from './tv.service';

export const TvContext = createContext();

export const TvContextProvider = ({ children }) => {
  const [popularShows, setPopularShows] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [showCredits, setShowCredits] = useState(null);
  const [show, setShow] = useState(null);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const retrievePopularShows = async () => {
    setIsLoadingPopular(true);
    setPopularShows([]);
    try {
      let ps = await GetPopularShows();
      ps = tvTransform(ps);
      setPopularShows(ps);
    } catch (err) {
      setError(err);
    }
    setIsLoadingPopular(false);
  };

  useEffect(() => {
    retrievePopularShows();
  }, []);

  const retrieveShowDetails = async (id) => {
    setIsLoadingDetails(true);
    setShowDetails(null);
    try {
      let sd = await GetShowDetails(id);
      sd = tvTransform([sd])[0];
      setShowDetails(sd);
    } catch (err) {
      setError(err);
    }
    setIsLoadingDetails(false);
  };

  const retrieveShowCredits = async (id) => {
    setIsLoadingCredits(true);
    setShowCredits(null);
    try {
      let sc = await GetShowCredits(id);
      setShowCredits(sc);
    } catch (err) {
      setError(err);
    }
    setIsLoadingCredits(false);
  };

  const onChangeId = async (id) => {
    setShow(null);
    setShowDetails(null);
    setShowCredits(null);
    await retrieveShowDetails(id);
    await retrieveShowCredits(id);
  };

  useEffect(() => {
    if (!isLoadingDetails && !isLoadingCredits) {
      setShow(combineTvInfo(showDetails, showCredits));
    }
  }, [showDetails, showCredits, isLoadingDetails, isLoadingCredits]);

  return (
    <TvContext.Provider
      value={{
        popularShows,
        isLoadingPopular,
        isLoadingDetails,
        isLoadingCredits,
        error,
        showDetails,
        changeShowId: onChangeId,
        show,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};
