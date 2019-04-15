import { observable, action, computed, reaction } from 'mobx';
import { routingStore as router } from '../../index';
import userStore from './userStore';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { setActivityProps } from '../common/util/util';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import commonStore from './commonStore';

const LIMIT = 3;

class ActivityStore {
  constructor() {
    reaction(
      () => Object.values(this.predicate),
      predicate => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadActivities();
      }
    )
  }

  @observable activityRegistry = new Map();
  @observable activity = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable submitting = false;
  @observable targetButton = null;
  @observable hubConnection = null;
  @observable activityCount = 0;
  @observable page = 0;
  @observable predicate = {};

  @computed get totalPages() {
    return Math.ceil(this.activityCount / LIMIT);
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', LIMIT);
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.isGoing && params.append('isGoing', true);
    this.predicate.isHost && params.append('isHost', true);
    this.predicate.startDate && params.append('startDate', this.predicate.startDate.toISOString());
    return params;
  }

  @action setDatePredicate = (date) => {
    this.predicate.startDate = date;
  }

  @action setPredicate = (e, {name}) => {
    switch(name) {
      case 'isGoing':
        this.predicate[name] = this.predicate[name] ? null : true;
        break;
      case 'isHost':
        this.predicate[name] = this.predicate[name] ? null : true;
        break;
      default:
        this.predicate = {}
        break;
    }
  }

  @action setPage = (page) => {
    this.page = page;
  }

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

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activityEnvelope = await agent.Activities.list()
      const {activities, activityCount} = activityEnvelope;
      activities.forEach(activity => {
        setActivityProps(activity, userStore.user);
        this.activityRegistry.set(activity.id, activity);
      });
      this.activityCount = activityCount;
      this.loadingInitial = false;
    } catch (err) {
      console.log(err);
      toast.error('Problem loading activities');
      this.loadingInitial = false;
    }
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
        setActivityProps(createdActivity, userStore.user);
        this.activityRegistry.set(createdActivity.id, createdActivity);
        this.editMode = false;
      })
      .then((createdActivity) => {
        router.push('/activities');
      })
      .catch(err =>
        toast.error(err.data.title ? err.data.title : 'Server error')
      )
      .finally(() => (this.submitting = false));
  };

  @action editActivity = activity => {
    this.submitting = true;
    agent.Activities.update(activity)
      .then(updatedActivity => {
        setActivityProps(updatedActivity, userStore.user);
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
