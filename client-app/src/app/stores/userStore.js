import { observable, action, computed } from "mobx";
import commonStore from './commonStore';
import agent from "../api/agent";
import {routingStore as router} from '../../index';

class UserStore {
    @observable loading = false;
    @observable user = null;

    @computed get isLoggedIn() {return !!this.user};

    @action login = (values) => {
        this.loading = true;
        return agent.User.login(values.email, values.password)
            .then((user) => {
                commonStore.setToken(user.token);
                console.log(user.token);
                this.user = user;
            })
            .catch(err => {
                throw err;
            })
            .finally(() => this.loading = false)
    }

    @action logout = () => {
        commonStore.setToken(undefined);
        this.user = null;
        router.push('/');
    }

    @action register = (values) => {
        this.loading = true;
        return agent.User.register(values)
            .then((user) => {
                commonStore.setToken(user.token);
                this.user = user;
            })
            .catch(err => {
                throw err;
            })
            .finally(() => this.loading = false);
    }

    @action getUser = () => {
        this.loading = true;
        return agent.User.current()
            .then((user) => {
                this.user = user;
            })
            .finally(() => this.loading = false)
    }
}

export default new UserStore();