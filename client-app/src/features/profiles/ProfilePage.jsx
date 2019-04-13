import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import LoadingComponent from '../../app/layout/LoadingComponent';

@inject('profileStore')
@observer
class ProfilePage extends Component {
  componentWillMount() {
    const username = this.props.match.params.username;
    this.props.profileStore.loadProfile(username);
  }

  render() {
      const {profileStore: {profile, loading}} = this.props;
      if (loading) return <LoadingComponent content='Loading profile...' />
    return (
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader profile={profile} />
          <ProfileContent />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ProfilePage;