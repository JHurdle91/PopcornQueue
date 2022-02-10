import React, { createContext, useEffect, useState } from 'react';

import {
  GetSeriesList,
  GetShowCredits,
  GetShowDetails,
} from '../../api/tv.api';
import { combineTvInfo } from './tv.service';
import { tvTransform } from './tv.service';

export const TvContext = createContext();

export const TvContextProvider = ({ children }) => {
  const [popularShows, setPopularShows] = useState([]);
  const [popularShowsPages, setPopularShowsPages] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [showCredits, setShowCredits] = useState(null);
  const [show, setShow] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const SeriesLists = {
    popular: {
      keyword: 'popular',
      seriesList: popularShows,
      setSeriesList: setPopularShows,
      pages: popularShowsPages,
      setPages: setPopularShowsPages,
    },
  };

  const retrieveSeriesList = async (list = 'popular', page = 1) => {
    const { keyword, seriesList, setSeriesList, pages, setPages } =
      SeriesLists[list];
    if (pages.includes(page)) {
      return;
    }
    setPages([...pages, page]);
    try {
      let result = await GetSeriesList(keyword, page);
      result = tvTransform(result);
      setSeriesList([...seriesList, ...result]);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    retrieveSeriesList('popular');
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
        isLoadingDetails,
        isLoadingCredits,
        error,
        showDetails,
        changeShowId: onChangeId,
        show,
        retrieveSeriesList,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};
