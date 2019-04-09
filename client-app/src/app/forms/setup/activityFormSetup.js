import { categories } from '../options/categoryOptions';
import activityStore from '../../stores/activityStore';
import { combineDateAndTime } from '../../common/util/util';
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

const fields = {
  fields: ['title', 'description', 'category', 'date', 'time', 'city', 'venue'],
  labels: {
    title: 'Activity title',
    description: 'Description',
    category: 'Activity Category',
    date: 'Date of Activity',
    time: 'Time of activity',
    city: 'City',
    venue: 'Venue'
  },
  placeholders: {
    title: 'Activity title',
    description: 'Description',
    category: 'Activity Category',
    date: 'Date of Activity',
    time: 'Time',
    city: 'City',
    venue: 'Venue'
  },
  extra: {
    category: categories
  },
  rules: {
    title: 'required',
    description: 'required',
    category: 'required',
    date: 'required',
    time: 'required',
    city: 'required',
    venue: 'required'
  }
};

const hooks = {
  hooks: {
    onSuccess(form) {
      const dateAndTime = combineDateAndTime(
        form.$('date').value,
        form.$('time').value
      );
      const {date, time, ...activity} = form.values();
      activity.date = dateAndTime;
      if (form.has('id')) {
          activityStore.editActivity(activity)
      } else {
          activityStore.createActivity(activity)
      }
    },
    onError(form) {
      console.log('form Errors :', form.errors());
    }
  },
  plugins: {
    dvr: dvr(validatorjs)
  },
  options: {
    defaultGenericError: 'Invalid data',
    validateOnChange: true,
  }
};

export default {
  fields,
  hooks
};
