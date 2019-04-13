import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Image, ButtonGroup, Button } from 'semantic-ui-react';

export default inject('photoWidgetStore', 'profileStore')(
  observer(
    ({
      photoWidgetStore: { imageCropPreview, clearImages },
      profileStore: { uploadPhoto, uploadingPhoto }
    }) => (
      <Fragment>
        <Image src={imageCropPreview} />
        <ButtonGroup widths={2}>
          <Button
            positive
            icon='check'
            loading={uploadingPhoto}
            onClick={uploadPhoto}
          />
          <Button icon='close' onClick={clearImages} />
        </ButtonGroup>
      </Fragment>
    )
  )
);
