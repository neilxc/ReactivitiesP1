import { observable, action, computed } from 'mobx';
import { format } from 'date-fns';
import agent from '../api/agent';

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity = null;
  @observable editMode = false;
  @observable loading = false;
  @observable targetButton = null;

  @action loadActivities() {
    this.loading = true;
    agent.Activities.list()
      .then(activities => {
        activities.forEach(activity => {
          activity.date = format(activity.date, 'YYYY-MM-DDTHH:mm');
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loading = false));
  }

  @action selectActivity = id => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action cancelSelectActivity = () => {
    this.activity = null;
  };

  @action createFormOpen = () => {
    this.editMode = true;
    this.activity = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action createActivity = activity => {
    this.loading = true;
    agent.Activities.create(activity)
      .then(createdActivity => {
        this.activityRegistry.set(createdActivity.id, createdActivity);
        this.editMode = false;
      })
      .finally(() => (this.loading = false));
  };

  @action editFormOpen = id => {
    this.activity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action editActivity = activity => {
    this.loading = true;
    agent.Activities.update(activity)
      .then(updatedActivity => {
        this.activityRegistry.set(updatedActivity.id, updatedActivity);
        this.activity = updatedActivity;
        this.editMode = false;
      })
      .finally(() => (this.loading = false));
  };

  @action deleteActivity = (e, id) => {
    this.loading = true;
    this.targetButton = e.target.name;
    agent.Activities.delete(id)
      .then(() => {
        this.activityRegistry.delete(id);
        this.activity = null;
        this.editMode = false;
      })
      .finally(() => (this.loading = false));
  };

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
}

export default new ActivityStore();
