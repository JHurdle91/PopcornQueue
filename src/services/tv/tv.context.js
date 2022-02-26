import React, { createContext, useEffect, useState } from 'react';

import {
  GetSeriesCredits,
  GetSeriesDetails,
  GetSeriesList,
} from '../../api/tv.api';
import { combineTvInfo } from './tv.service';
import { tvTransform } from './tv.service';

export const TvContext = createContext();

export const TvContextProvider = ({ children }) => {
  const [popularSeries, setPopularSeries] = useState([]);
  const [popularSeriesPages, setPopularSeriesPages] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [seriesCredits, setSeriesCredits] = useState(null);
  const [series, setSeries] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [error, setError] = useState(null);

  const SeriesLists = {
    popular: {
      keyword: 'popular',
      seriesList: popularSeries,
      setSeriesList: setPopularSeries,
      pages: popularSeriesPages,
      setPages: setPopularSeriesPages,
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

  const retrieveSeriesDetails = async (id) => {
    setIsLoadingDetails(true);
    setSeriesDetails(null);
    try {
      let sd = await GetSeriesDetails(id);
      sd = tvTransform([sd])[0];
      setSeriesDetails(sd);
    } catch (err) {
      setError(err);
    }
    setIsLoadingDetails(false);
  };

  const retrieveSeriesCredits = async (id) => {
    setIsLoadingCredits(true);
    setSeriesCredits(null);
    try {
      let sc = await GetSeriesCredits(id);
      setSeriesCredits(sc);
    } catch (err) {
      setError(err);
    }
    setIsLoadingCredits(false);
  };

  const onChangeId = async (id) => {
    setSeries(null);
    setSeriesDetails(null);
    setSeriesCredits(null);
    await retrieveSeriesDetails(id);
    await retrieveSeriesCredits(id);
  };

  useEffect(() => {
    if (!isLoadingDetails && !isLoadingCredits) {
      setSeries(combineTvInfo(seriesDetails, seriesCredits));
    }
  }, [seriesDetails, seriesCredits, isLoadingDetails, isLoadingCredits]);

  return (
    <TvContext.Provider
      value={{
        popularSeries,
        isLoadingDetails,
        isLoadingCredits,
        error,
        seriesDetails,
        changeSeriesId: onChangeId,
        series,
        retrieveSeriesList,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};
