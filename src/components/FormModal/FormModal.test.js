import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import FormModal from './FormModal';
import Modal from '../Modal';
import ModalButton from '../Modal/ModalButton';

Enzyme.configure({ adapter: new Adapter() });

describe('<FormModal />', () => {
    let props;
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FormModal />, div);
    });

    it('renders a <Modal /> component', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find(Modal).length).toBe(1);
    });

    it('renders a <Modal /> component that contains everything else', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find(Modal).first().children()).toEqual(wrapper.children());
    });

    it('renders a .modal-body', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find('.modal-body').length).toBe(1);
    });

    it('renders its children inside the .modal-body', () => {
        let child = <div>text</div>;
        const wrapper = shallow(<FormModal>{child}</FormModal>);
        expect(wrapper.find('.modal-body').first().contains(child)).toBe(true);
    });

    it('passes the necessary props to the <Modal /> component', () => {
        const wrapper = shallow(<FormModal showModal={true} submitted={false} title={'modal'}/>);
        expect(wrapper.find(Modal).props().showModal).toBe(true);
        expect(wrapper.find(Modal).props().submitted).toBe(false);
        expect(wrapper.find(Modal).props().title).toBe('modal');
    });
    
    it('renders a .modal-footer', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find('.modal-footer').length).toBe(1);
    });

    it('renders a <ModalButton /> component', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find(ModalButton).length).toBe(1);
    });

    it('passes the necessary props to the <ModalButton /> component', () => {
        props = {
            submit: jest.fn(),
            loading: false,
            enabled: true
        }
        const wrapper = shallow(<FormModal {...props} />);
        expect(wrapper.find(ModalButton).props().onClick).toEqual(props.submit);
        expect(wrapper.find(ModalButton).props().loading).toBe(props.loading);
        expect(wrapper.find(ModalButton).props().enabled).toBe(props.enabled);
    });

    it('renders children when passed in', () => {
        const wrapper = shallow((
            <FormModal>
                <div className="unique" />
            </FormModal>
        ));
        expect(wrapper.contains(<div className="unique" />)).toBe(true);
    });
});