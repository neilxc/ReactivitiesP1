import React, { Fragment } from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import PhotoUploadWidgetDropzone from './PhotoUploadWidgetDropzone';
import PhotoUploadImagePreview from './PhotoUploadImagePreview';
import PhotoUploadWidgetCropper from './PhotoUploadWidgetCropper';

export default inject('photoWidgetStore')(
  observer(({ photoWidgetStore: { imagePreview, imageCropPreview } }) => (
    <Fragment>
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <PhotoUploadWidgetDropzone />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {imagePreview &&
          <PhotoUploadWidgetCropper />}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview and Upload' />
          {imageCropPreview &&
          <PhotoUploadImagePreview />}
        </Grid.Column>
      </Grid>
    </Fragment>
  ))
);
