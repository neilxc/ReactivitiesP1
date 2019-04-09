import { observable, action } from "mobx";

class ModalStore {
    @observable modal = {
        isOpen: false,
        header: null,
        component: null
    };

    @action openModal = (props) => {
        this.modal.isOpen = true;
        this.modal.header = props.header;
        this.modal.component = props.component;
    }

    @action closeModal = () => {
        this.modal.isOpen = false;
        this.modal.header = null;
        this.modal.component = null;
    }
}

export default new ModalStore();