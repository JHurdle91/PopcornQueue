import styled from 'styled-components/native';
import React, { useContext } from 'react';
import { List, Modal, Portal, Provider } from 'react-native-paper';
import { ScrollView } from 'react-native';

import {
  Loading,
  LoadingContainer,
} from '../../detail/components/detail.styles';
import { MediaContext } from '../../../services/media/media.context';
import { MoviesContext } from '../../../services/movies/movies.context';
import { POSTERS } from '../../../api/constants';
import { PeopleContext } from '../../../services/people/people.context';
import { TvContext } from '../../../services/tv/tv.context';
import { theme } from '../../../infrastructure/theme';

export const SearchModal = ({ navigation, visible, onHideModal }) => {
  const { searchResults } = useContext(MediaContext);
  const { changeMovieId } = useContext(MoviesContext);
  const { changeSeriesId } = useContext(TvContext);
  const { changePersonId } = useContext(PeopleContext);

  const SearchItem = styled(List.Item)`
    padding: ${(props) => props.theme.space[3]};
  `;

  const Thumbnail = styled.Image`
    width: 50px;
    height: 75px;
  `;

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const hideModal = () => {
    onHideModal();
  };

  return (
    <Provider>
      <Portal>
        {!searchResults ? (
          <LoadingContainer>
            <Loading
              size={100}
              animating={visible}
              color={theme.colors.brand.primary}
            />
          </LoadingContainer>
        ) : (
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <List.Section>
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchResults.map((item) => {
                  const type = item.mediaType;
                  const key = `SearchItem-${type}-${item.id}`;
                  let imagePath;
                  let typeDisplay;
                  let changeId;
                  let detailPage;
                  if (type === 'movie') {
                    imagePath = 'posterPath';
                    typeDisplay = 'Movie';
                    changeId = changeMovieId;
                    detailPage = 'MovieDetail';
                  } else if (type === 'tv') {
                    imagePath = 'posterPath';
                    typeDisplay = 'TV Show';
                    changeId = changeSeriesId;
                    detailPage = 'TvDetail';
                  } else {
                    imagePath = 'profilePath';
                    typeDisplay = 'Person';
                    changeId = changePersonId;
                    detailPage = 'PersonDetail';
                  }
                  const source = `${POSTERS}${item[imagePath]}`;
                  return (
                    <SearchItem
                      key={key}
                      title={item.title || item.name}
                      left={() => (
                        <Thumbnail
                          resizeMode="cover"
                          resizeMethod="resize"
                          source={{ uri: source }}
                        />
                      )}
                      description={`${typeDisplay}`}
                      onPress={() => {
                        changeId(item.id);
                        navigation.navigate(detailPage);
                      }}
                    />
                  );
                })}
              </ScrollView>
            </List.Section>
          </Modal>
        )}
      </Portal>
    </Provider>
  );
};
