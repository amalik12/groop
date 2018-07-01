import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from './Modal';
import ReactModal from 'react-modal';

Enzyme.configure({ adapter: new Adapter() });

describe('<Modal />', () => {
    let props = {
        showModal: true,
        submitted: false,
        dismiss: jest.fn(),
        dismissable: false,
        title: 'Modal',

    }
    describe('has a <ReactModal />', () => {
        const wrapper = shallow(<Modal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find(ReactModal).length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find(ReactModal).children()).toEqual(wrapper.children());
        });

        it('that is passed required props', () => {
            expect(wrapper.find(ReactModal).props().isOpen).toEqual(props.showModal);
            expect(wrapper.find(ReactModal).props().onRequestClose).toEqual(props.dismiss);
            expect(wrapper.find(ReactModal).props().shouldCloseOnOverlayClick).toEqual(props.dismissable);
        });

        it('that sets its className based on the submitted prop', () => {
            const wrapper = shallow(<Modal {...props} />);
            expect(wrapper.find(ReactModal).props().className).toEqual('modal');
            wrapper.setProps({submitted: true});
            expect(wrapper.find(ReactModal).props().className).toEqual('modal confirm');
        });
    });

    describe('has a .modal-title', () => {
        const wrapper = shallow(<Modal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find('.modal-title').length).toBe(1);
        });

        it('that is passed the user.name prop', () => {
            expect(wrapper.find('.modal-title').text()).toBe(props.title);
        });
    });

    it('only displays the close button if dismissable prop is true', () => {
        const wrapper = shallow(<Modal {...props} />);
        expect(wrapper.find('.modal-close').length).toBe(0);
        wrapper.setProps({dismissable: true});
        expect(wrapper.find('.modal-close').length).toBe(1);
    });

    it('renders children', () => {
        const wrapper = shallow(<Modal {...props}><img></img></Modal>);
        expect(wrapper.find('img').length).toBe(1);
    });
});