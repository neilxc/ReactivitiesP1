import axios from 'axios';
import { toast } from 'react-toastify';
import { routingStore as router } from '../../index';
import commonStore from '../stores/commonStore';
import activityStore from '../stores/activityStore';
import userStore from '../stores/userStore';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use(
  config => {
    if (commonStore.token)
      config.headers.Authorization = `Bearer ${commonStore.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (!error.status) {
    alert('Server network error - check dotnet run and the console')
  }
  if (error.response.status === 401 && error.response.data === "") {
    userStore.logout();
    toast.info('Your session has expired, please login again');
  }
  if (error.response.status === 404) {
    toast.error('Resource could not be found');
    router.push('/activities');
    return Promise.reject(error.response);
  }
  if (error.response.status === 400) {
    throw error.response;
  }
  if (error.response.status === 500) {
    toast.error(error.response.data.errors || 'Internal Server Error');
    return Promise.reject(error.response);
  }
  return Promise.reject(error.response);
});

const responseBody = res => res.data;

// const sleep = ms => x =>
//   new Promise(resolve => setTimeout(() => resolve(x), ms));

const requests = {
  get: url =>
    axios
      .get(url)
      .then(responseBody),
  post: (url, body) =>
    axios
      .post(url, body)
      .then(responseBody),
  put: (url, body) =>
    axios
      .put(url, body)
      .then(responseBody),
  del: url =>
    axios
      .delete(url)
      .then(responseBody),
  form: (url, file) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(responseBody);
  }
};

const Activities = {
  list: () =>
    axios
      .get(`/activities`, { params: activityStore.axiosParams })
      .then(responseBody),
  get: id => requests.get(`/activities/${id}`),
  create: activity => requests.post(`/activities`, activity),
  update: activity => requests.put(`/activities/${activity.id}`, activity),
  delete: id => requests.del(`/activities/${id}`),
  attend: id => requests.post(`/activities/${id}/attend`),
  unattend: id => requests.del(`/activities/${id}/attend`)
};

const User = {
  current: () => requests.get(`/user`),
  login: (email, password) => requests.post(`/user/login`, { email, password }),
  register: values => requests.post(`/user/register`, values)
};

const Profiles = {
  get: username => requests.get(`/profiles/${username}`),
  uploadPhoto: photo => requests.form(`/photos`, photo),
  setMainPhoto: id => requests.post(`/photos/${id}/setMain`),
  deletePhoto: id => requests.del(`/photos/${id}`),
  updateProfile: profile => requests.put(`/profiles`, profile),
  listFollowings: (username, followers) =>
    requests.get(`/profiles/${username}/follow?followers=${followers}`),
  follow: username => requests.post(`/profiles/${username}/follow`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

const UserActivities = {
  past: (username) => requests.get(`/profiles/${username}/activities?past=true`),
  future: (username) => requests.get(`/profiles/${username}/activities?future=true`),
  hosting: (username) => requests.get(`/profiles/${username}/activities?hosting=true`)
}

export default {
  Activities,
  User,
  Profiles,
  UserActivities
};
