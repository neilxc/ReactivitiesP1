import { observable, action, computed } from 'mobx';
import { routingStore as router } from '../../index';
import userStore from './userStore';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { setActivityProps } from '../common/util/util';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import commonStore from './commonStore';

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable submitting = false;
  @observable targetButton = null;
  @observable hubConnection = null;

  @action createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chat', {
        accessTokenFactory: () => commonStore.token
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection.id))
      .catch(err => console.log('Error establishing connection: ', err));

    this.hubConnection.on('ReceiveComment', comment => {
      this.activity.comments.push(comment);
    });
  }

  @action stopHubConnection = () => {
    this.hubConnection.stop();
  };

  @action addComment = values => {
    values.id = this.activity.id;
    return this.hubConnection
      .invoke('SendComment', values)
      .catch(err => {
        console.log(err);
      });
  };

  @action loadActivities() {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          setActivityProps(activity, userStore.user);
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  }

  @action loadActivity = (id, acceptCached) => {
    if (acceptCached) {
      const activity = this.getActivity(id);
      if (activity) {
        this.activity = activity;
        return Promise.resolve(activity);
      }
    }
    this.loadingInitial = true;
    return agent.Activities.get(id)
      .then(activity => {
        setActivityProps(activity, userStore.user);
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        return Promise.resolve(activity);
      })
      .finally(() => (this.loadingInitial = false));
  };

  getActivity(id) {
    return this.activityRegistry.get(id);
  }

  @action createActivity = activity => {
    this.submitting = true;
    return agent.Activities.create(activity)
      .then(createdActivity => {
        createdActivity.date = new Date(createdActivity.date);
        this.activityRegistry.set(createdActivity.id, createdActivity);
        this.editMode = false;
      })
      .then(() => router.push('/activities'))
      .catch(err =>
        toast.error(err.data.title ? err.data.title : 'Server error')
      )
      .finally(() => (this.submitting = false));
  };

  @action editActivity = activity => {
    this.submitting = true;
    agent.Activities.update(activity)
      .then(updatedActivity => {
        updatedActivity.date = new Date(updatedActivity.date);
        this.activityRegistry.set(updatedActivity.id, updatedActivity);
        this.activity = updatedActivity;
        this.editMode = false;
      })
      .then(() => router.push(`/activities/${activity.id}`))
      .catch(err =>
        toast.error(err.data.title ? err.data.title : 'Server error')
      )
      .finally(() => (this.submitting = false));
  };

  @action deleteActivity = (e, id) => {
    this.submitting = true;
    this.targetButton = e.target.name;
    agent.Activities.delete(id)
      .then(() => {
        this.activityRegistry.delete(id);
        this.activity = null;
        this.editMode = false;
      })
      .then(() => router.push('/activities'))
      .finally(() => (this.submitting = false));
  };

  @action attendActivity = () => {
    const attendee = {
      displayName: userStore.user.displayName,
      username: userStore.user.username,
      isHost: false,
      image: userStore.user.image
    };
    this.loading = true;
    agent.Activities.attend(this.activity.id)
      .then(() => {
        this.activity.attendees.push(attendee);
        this.activity.isGoing = true;
        this.activityRegistry.set(this.activity.id, this.activity);
      })
      .catch(err => {
        toast.error('problem adding attendance');
      })
      .finally(() => {
        this.loading = false;
      });
  };

  @action cancelAttendance = () => {
    const username = userStore.user.username;
    this.loading = true;
    agent.Activities.unattend(this.activity.id)
      .then(() => {
        this.activity.attendees = this.activity.attendees.filter(
          a => a.username !== username
        );
        this.activity.isGoing = false;
        this.activityRegistry.set(this.activity.id, this.activity);
      })
      .catch(err => {
        toast.error('problem removing attendance');
      })
      .finally(() => {
        this.loading = false;
      });
  };

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activities) {
    const sortedActivities = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
    );
  }
}

export default new ActivityStore();
