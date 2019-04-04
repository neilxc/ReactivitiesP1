import { observable, action, computed } from 'mobx';
import { routingStore as router } from '../../index';
import agent from '../api/agent';
import { toast } from 'react-toastify';

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity = null;
  @observable loadingInitial = false;
  @observable loading = false;
  @observable submitting = false;
  @observable targetButton = null;

  @action loadActivities() {
    this.loadingInitial = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date);
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
    this.loading = true;
    return agent.Activities.get(id)
      .then(activity => {
        activity.date = new Date(activity.date);;
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        return Promise.resolve(activity);
      })
      .finally(() => (this.loading = false));
  };

  getActivity(id) {
    return this.activityRegistry.get(id);
  }

  @action createActivity = activity => {
    this.submitting = true;
    return agent.Activities.create(activity)
      .then(createdActivity => {
        this.activityRegistry.set(createdActivity.id, createdActivity);
        this.editMode = false;
      })
      .then(() => router.push('/activities'))
      .catch((err) => toast.error(err.data.title ? err.data.title : 'Server error'))
      .finally(() => (this.submitting = false));
  };

  @action editActivity = activity => {
    this.submitting = true;
    agent.Activities.update(activity)
      .then(updatedActivity => {
        this.activityRegistry.set(updatedActivity.id, updatedActivity);
        this.activity = updatedActivity;
        this.editMode = false;
      })
      .then(() => router.push(`/activities/${activity.id}`))
      .catch((err) => toast.error(err.data.title ? err.data.title : 'Server error'))
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

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
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
