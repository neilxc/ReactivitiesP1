import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import dvr from 'mobx-react-form/lib/validators/DVR';
import dvrExtend from './extension/dvr';

export default class Form extends MobxReactForm {
    plugins() {
        return {
            dvr: dvr ({
                package: validatorjs,
                extend: dvrExtend
            })
        }
    }

    options() {
        return {
            defaultGenericError: 'Invalid Data',
            validateOnChange: true
        }
    }
}