import styled from 'styled-components/native';

export const Container = styled.View``;

export const ListContainer = styled.View`
  width: 100%;
  height: 150px;
`;

export const MediaFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingLeft: 4,
  },
})``;
