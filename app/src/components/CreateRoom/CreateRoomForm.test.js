import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateRoomForm from './CreateRoomForm';
import TextField from '../TextField';
import Button from '../Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateRoom />', () => {
    let props = {
        name: '',
        name_error: '',
        shortid: '',
        shortid_error: '',
        handleChange: jest.fn(),
        submit: jest.fn(),
        enabled: false,
        loading: false
    }
    const wrapper = shallow(<CreateRoomForm {...props} />);

    describe('has a .CreateRoomForm', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.CreateRoomForm').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.CreateRoomForm').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has two <TextField/> components', () => {
        it('that are rendered', () => {
            expect(wrapper.find(TextField).length).toBe(2);
        });

        it('that are passed the necessary props', () => {
            let first = wrapper.find(TextField).first();
            expect(first.props().errorText).toEqual(props.name_error);
            expect(first.props().handleChange).toEqual(props.handleChange);
            expect(first.props().value).toEqual(props.name);

            let last = wrapper.find(TextField).last();
            expect(last.props().errorText).toEqual(props.shortid_error);
            expect(last.props().handleChange).toEqual(props.handleChange);
            expect(last.props().value).toEqual(props.shortid);
        });
    });

    describe('has a <Button/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Button).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            let button = wrapper.find(Button).first();
            expect(button.props().onClick).toEqual(props.submit);
            expect(button.props().enabled).toEqual(props.enabled);
            expect(button.props().loading).toEqual(props.loading);
        });
    });

    describe('has a .create-room-domain', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.create-room-domain').length).toBe(1);
        });

        it('that displays the domain', () => {
            expect(wrapper.find('.create-room-domain').first().text()).toBe(window.location.host + '/');
        });
    });
});