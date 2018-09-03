import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CreateRoom } from './CreateRoom';
import SigninModal from '../SigninModal';
import CreateRoomForm from './CreateRoomForm';
import { Redirect } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateRoom />', () => {
    let props = {
        socket: {},
        done: false,
        name_error: '',
        shortid_error: '',
        auth: jest.fn(() => new Promise((resolve, reject) => { }))
    }
    const wrapper = shallow(<CreateRoom {...props} />);

    describe('has an outer div', () => {
        it('that is rendered', () => {
            expect(wrapper.find('div').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('div').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has a <SigninModal/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(SigninModal).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find(SigninModal).props().socket).toEqual(props.socket);
        });
    });

    describe('has a <CreateRoomForm/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(CreateRoomForm).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find(CreateRoomForm).props().name).toBe(wrapper.state().name);
            expect(wrapper.find(CreateRoomForm).props().shortid).toBe(wrapper.state().shortid);
            expect(wrapper.find(CreateRoomForm).props().loading).toBe(props.loading);
            expect(wrapper.find(CreateRoomForm).props().handleChange).toBe(wrapper.instance().handleChange);
            expect(wrapper.find(CreateRoomForm).props().submit).toBe(wrapper.instance().submit);
            expect(wrapper.find(CreateRoomForm).props().enabled).toBe(wrapper.state().name && !props.name_error && !props.shortid_error);
            expect(wrapper.find(CreateRoomForm).props().name_error).toBe(props.name_error);
            expect(wrapper.find(CreateRoomForm).props().shortid_error).toBe(props.shortid_error);
        });
    });

    describe('has a <Redirect/> component', () => {
        it('that is rendered when the done prop is set', () => {
            expect(wrapper.find(Redirect).length).toBe(0);
            wrapper.setProps({done: true});
            expect(wrapper.find(Redirect).length).toBe(1);
        });
    });
});