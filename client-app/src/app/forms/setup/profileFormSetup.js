import profileStore from '../../stores/profileStore';

const fields = {
    fields: {
        displayName: {
            label: 'Display Name',
            placeholder: 'Display Name',
            rules: 'required'
        },
        bio: {
            label: 'Description',
            placeholder: 'Tell us about yourself',
            rules: 'string',
        }
    }
}

const hooks = {
    hooks: {
        onSuccess(form) {
            profileStore.updateProfile(form.values());
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