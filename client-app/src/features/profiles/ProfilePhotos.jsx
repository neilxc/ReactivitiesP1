import React, { Fragment } from 'react';
import {
  TabPane,
  Header,
  CardGroup,
  Card,
  Image,
  Button,
  ButtonGroup
} from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

export default inject('profileStore')(
  observer(
    ({
      profileStore: {
        profile,
        isCurrentUser,
        uploadPhotoMode,
        editPhotoMode,
        toggleEditPhotoMode,
        toggleUploadPhotoMode,
        loadingSetMain,
        setMainPhoto,
        targetButton,
        deletePhoto,
        deletingPhoto
      }
    }) => (
      <TabPane>
        <TabHeader>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Fragment>
              {!uploadPhotoMode && (
                <Button
                  floated='right'
                  content={editPhotoMode ? 'Cancel' : 'Edit'}
                  basic
                  onClick={toggleEditPhotoMode}
                />
              )}
              {editPhotoMode && (
                <Button
                  floated='right'
                  content={uploadPhotoMode ? 'Cancel' : 'Add Photo'}
                  basic
                  onClick={toggleUploadPhotoMode}
                />
              )}
            </Fragment>
          )}
        </TabHeader>
        <TabContent>
          {uploadPhotoMode ? (
            <PhotoUploadWidget />
          ) : (
            <CardGroup itemsPerRow={5}>
              {profile.photos &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {editPhotoMode && (
                      <ButtonGroup fluid widths={2}>
                        <Button
                          name={photo.id}
                          basic
                          disabled={photo.isMain}
                          color='green'
                          onClick={e => setMainPhoto(photo, e)}
                          loading={targetButton === photo.id && loadingSetMain}
                        >
                          Main
                        </Button>
                        <Button
                          name={photo.id}
                          basic
                          disabled={photo.isMain}
                          color='red'
                          icon='trash'
                          onClick={e => deletePhoto(photo, e)}
                          loading={targetButton === photo.id && deletingPhoto}
                        />
                      </ButtonGroup>
                    )}
                  </Card>
                ))}
            </CardGroup>
          )}
        </TabContent>
      </TabPane>
    )
  )
);
