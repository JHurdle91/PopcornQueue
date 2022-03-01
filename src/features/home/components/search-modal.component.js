import React from 'react';
import { Modal, Portal, Provider, Text } from 'react-native-paper';

export const SearchModal = ({ visible, searchKeyword, onHideModal }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const hideModal = () => {
    onHideModal();
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>{searchKeyword}</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};
