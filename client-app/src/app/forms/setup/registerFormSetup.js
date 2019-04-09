import userStore from '../../stores/userStore';
import {routingStore as router} from '../../../index';
import modalStore from '../../stores/modalStore';

const fields = {
    fields: {
        displayName: {
            label: 'Display Name',
            placeholder: 'Display Name',
            rules: 'required|string',
        },
        username: {
            label: 'Username',
            placeholder: 'Username',
            rules: 'required|string',
        },
        email: {
            label: 'Email',
            placeholder: 'Email Address',
            rules: 'required|email'
        },
        password: {
            label: 'Password',
            placeholder: 'Password',
            rules: 'required|string|between:6,10|password',
        }
    }
}

const hooks = {
    hooks: {
        onSuccess(form) {
            userStore.register(form.values())
                .then(() => {
                    modalStore.closeModal();
                    router.push('/activities')
                })
                .catch(err => {
                    console.log(err);
                    form.invalidate(err);
                    form.each(field => {
                        field.debouncedValidation.cancel();
                    })
                });
        },
        onError(form) {
            console.log(form.errors())
        }
    }
}

export default {
    fields,
    hooks
}