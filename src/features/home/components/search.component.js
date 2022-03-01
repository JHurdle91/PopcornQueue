import styled from 'styled-components/native';
import React, { useContext, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { MediaContext } from '../../../services/media/media.context';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ onKeywordChange }) => {
  const { keyword, search } = useContext(MediaContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const handleChangeText = (text) => {
    setSearchKeyword(text);
    onKeywordChange(text);
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          handleChangeText(text);
        }}
      />
    </SearchContainer>
  );
};
