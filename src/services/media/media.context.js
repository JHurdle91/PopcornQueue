import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const MediaContext = createContext();

export const MediaContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [media, setMedia] = useState([]);

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

  const add = (item, status) => {
    const newMedia = media.filter(
      (x) => x.item.type !== item.type || x.item.id !== item.id
    );
    setMedia([...newMedia, { item, status }]);
  };

  const remove = (item) => {
    const newMedia = media.filter(
      (x) => x.item.type !== item.type || x.item.id !== item.id
    );
    setMedia(newMedia);
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
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
