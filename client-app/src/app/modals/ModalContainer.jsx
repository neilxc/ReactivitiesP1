import React from 'react';
import { Modal } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

const ModalContainer = ({
  modalStore: {
    modal: { isOpen, component, header },
    closeModal
  }
}) => (
  <Modal open={isOpen} onClose={closeModal} size='mini'>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>
      <Modal.Description>{component}</Modal.Description>
    </Modal.Content>
  </Modal>
);

export default inject('modalStore')(observer(ModalContainer));
