import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MembersModal } from './MembersModal';
import Modal from '../Modal';

import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from '../Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('<MembersModal />', () => {
    describe('has a <Modal /> component', () => {
        let props = {
            showModal: true,
            dismiss: jest.fn()
        }
        const wrapper = shallow(<MembersModal {...props}/>);
        let modal = wrapper.find(Modal).first();
        it('that is rendered', () => {
            expect(wrapper.find(Modal).length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(modal.children()).toEqual(wrapper.children());
        });

        it('that is passed the necessary props', () => {
            expect(modal.props().showModal).toEqual(props.showModal);
            expect(modal.props().dismiss).toEqual(props.dismiss);
        });
    });

    describe('has a .modal-body', () => {
        let props = {
            showModal: true,
            dismiss: jest.fn(),
            members: [<Avatar user={{avatar: 'Joe'}}/>]
        }
        const wrapper = shallow(<MembersModal {...props}/>);
        it('that is rendered', () => {
            expect(wrapper.find('.modal-body').length).toBe(1);
        });

        it('that contains the members prop', () => {
            expect(wrapper.find('.modal-body').first().contains(props.members)).toBe(true);
        });
    });
});