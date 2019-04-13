import { observable, action, computed, reaction } from 'mobx';
import agent from '../api/agent';
import userStore from './userStore';
import photoWidgetStore from './photoWidgetStore';
import { toast } from 'react-toastify';

class ProfileStore {
  constructor() {
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab !== 3 || activeTab !== 4) {
          this.followings = [];
        }
        if (activeTab === 3 || activeTab === 4) {
          const followers = activeTab === 3 ? true : false;
          this.loadFollowings(followers);
        }
      }
    )
  }

  @observable profile = {};
  @observable loading = false;
  @observable loadingProfile = false;
  @observable editPhotoMode = false;
  @observable uploadPhotoMode = false;
  @observable editProfileMode = false;
  @observable uploadingPhoto = false;
  @observable loadingSetMain = false;
  @observable updatingProfile = false;
  @observable deletingPhoto = false;
  @observable targetButton = null;
  @observable activeTab = null;
  @observable followings = [];
  @observable loadingFollowings = false;

  @computed get isCurrentUser() {
    return userStore.user.username === this.profile.username;
  }

  @action setActiveTab = (e, data) => {
    this.activeTab = data.activeIndex;
  }

  @action loadFollowings = (followers) => {
    this.loadingFollowings = true;
    agent.Profiles.listFollowings(this.profile.username, followers)
      .then((followings) => {
        this.followings = followings;
        this.loadingFollowings = false;
      })
      .catch(err => {
        toast.error('Problem loading followings')
      })
      .finally(() => this.loadingFollowings = false);
  }

  @action follow = username => {
    this.loading = true;
    agent.Profiles.follow(username)
      .then(() => {
        this.profile.following = true;
      })
      .catch(err => {
        toast.error('problem following user')
      })
      .finally(() => this.loading = false);
  }

  @action unfollow = username => {
    this.loading = true;
    agent.Profiles.unfollow(username) 
      .then(() => {
        this.profile.following = false;
      })
      .catch(err => {
        toast.error('problem with request')
      })
      .finally(() => this.loading = false)
  }

  @action toggleEditProfileMode = () => {
    this.editProfileMode = !this.editProfileMode;
  }

  @action toggleEditPhotoMode = () => {
    this.editPhotoMode = !this.editPhotoMode;
  };

  @action toggleUploadPhotoMode = () => {
    this.uploadPhotoMode = !this.uploadPhotoMode;
  };

  @action loadProfile = username => {
    this.loadingProfile = true;
    agent.Profiles.get(username)
      .then(profile => {
        this.profile = profile;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loadingProfile = false;
      });
  };

  @action updateProfile = values => {
    this.updatingProfile = true;
    agent.Profiles.updateProfile(values)
      .then((profile) => {
        if (values.displayName !== userStore.user.displayName)
          userStore.user.displayName = values.displayName;
        this.profile = profile;
      })
      .catch(err => {
        toast.error('Error updating profile')
      })
      .finally(() => {
        this.updatingProfile = false;
        this.editProfileMode = false;
      })
  }

  @action uploadPhoto = () => {
    this.uploadingPhoto = true;
    agent.Profiles.uploadPhoto(photoWidgetStore.croppedImage)
      .then((photo) => {
        this.profile.photos.push(photo);
        if (photo.isMain) {
          userStore.user.image = photo.url;
          this.profile.image = photo.url;
        }
        this.uploadPhotoMode = false;
        photoWidgetStore.clearImages();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.uploadingPhoto = false;
        photoWidgetStore.clearImages();
      });
  }

  @action setMainPhoto = (photo, e) => {
    this.loadingSetMain = true;
    this.targetButton = e.target.name;
    agent.Profiles.setMainPhoto(photo.id)
      .then(() => {
        userStore.user.image = photo.url;
        this.profile.photos.find(a => a.isMain).isMain = false;
        this.profile.photos.find(a => a.id === photo.id).isMain = true;
        this.profile.image = photo.url;
      })
      .catch(err => {
        toast.error('Problem setting photo as main')
      })
      .finally(() => {
        this.loadingSetMain = false;
        this.targetButton = null;
      })
  }

  @action deletePhoto = (photo, e) => {
    this.targetButton = e.target.name;
    this.deletingPhoto = true;
    agent.Profiles.deletePhoto(photo.id)
      .then(() => {
        this.profile.photos = this.profile.photos.filter(a => a.id !== photo.id);
        if (photo.isMain) {
          userStore.user.image = null;
          this.profile.image = null;
        }
      })
      .catch(err => {
        toast.error(err);
      })
      .finally(() => {
        this.deletingPhoto = false;
        this.targetButton = null;
      })
  }
}

export default new ProfileStore();
