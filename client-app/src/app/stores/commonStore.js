import {observable, action, reaction} from 'mobx';
import jwt_decode from 'jwt-decode';

class CommonStore {
    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    @observable token = window.localStorage.getItem('jwt');
    @observable decodedToken = null;
    @observable appLoaded = false;

    @action setToken(token) {
        this.token = token;
        console.log(token);
        this.decodedToken = token ? jwt_decode(token) : null;
        console.log(this.decodedToken);
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();