import React from 'react';
import { observer, inject } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';

export default inject('photoWidgetStore')(
  observer(({ photoWidgetStore: { imagePreview, onDropFile } }) => (
    <Dropzone
      onDrop={acceptedFiles => onDropFile(acceptedFiles)}
      multiple={false}
      disabled={!!imagePreview}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={'dropzone ' + (isDragActive && 'dropzone--isActive')}
        >
          <input {...getInputProps()} />
          <Icon name='upload' size='huge' />
          <Header content='Drop image here' />
        </div>
      )}
    </Dropzone>
  ))
);
