import AsyncStorage from '@react-native-async-storage/async-storage';
import camelize from 'camelize';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { GetMultiSearch } from '../../api/search.api';

export const MediaContext = createContext();

export const MediaContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [media, setMedia] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
  const [error, setError] = useState(null);

  const STATUS = {
    queued: 1,
    good: 2,
    bad: 3,
    ignore: 4,
  };

  const saveMedia = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@media-${uid}`, jsonValue);
    } catch (e) {
      console.log('error saving media', e);
    }
  };

  const loadMedia = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@media-${uid}`);
      if (value !== null) {
        setMedia(JSON.parse(value));
      }
    } catch (e) {
      console.log('error loading media', e);
    }
  };

  const add = (item, type, status) => {
    const newMedia = media.filter((x) => x.type !== type || x.id !== item.id);
    item.type = type;
    item.status = status;
    setMedia([...newMedia, item]);
  };

  const remove = (item, type) => {
    const newMedia = media.filter((x) => x.type !== type || x.id !== item.id);
    setMedia(newMedia);
  };

  const clear = () => {
    setMedia([]);
  };

  const retrieveSearchResults = async (keyword) => {
    setIsLoadingSearchResults(true);
    setSearchResults(null);
    const encodedKeyword = encodeURIComponent(keyword);
    try {
      let sr = await GetMultiSearch(encodedKeyword);
      //console.log({ encodedKeyword });
      sr = camelize(sr);
      setSearchResults(sr);
    } catch (err) {
      setError(err);
    }
    setIsLoadingSearchResults(false);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadMedia(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && media.length) {
      saveMedia(media, user.uid);
    }
  }, [media, user]);

  return (
    <MediaContext.Provider
      value={{
        media,
        STATUS,
        addToMedia: add,
        removeFromMedia: remove,
        clearMedia: clear,
        searchResults,
        isLoadingSearchResults,
        search: retrieveSearchResults,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
