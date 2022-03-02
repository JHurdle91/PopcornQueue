import styled from 'styled-components/native';
import React, { useContext, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { MediaContext } from '../../../services/media/media.context';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ onSearchSubmit }) => {
  const { search } = useContext(MediaContext);
  const [searchKeyword, setSearchKeyword] = useState(null);

  const handleChangeText = (text) => {
    setSearchKeyword(text);
  };

  const handleSubmit = (keyword) => {
    search(keyword);
    onSearchSubmit(keyword);
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        onSubmitEditing={() => {
          handleSubmit(searchKeyword);
        }}
        onChangeText={(text) => {
          handleChangeText(text);
        }}
      />
    </SearchContainer>
  );
};
