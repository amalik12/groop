import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { LoginModal } from './LoginModal';
import FormModal from '../FormModal';
import TextField from '../TextField';

Enzyme.configure({ adapter: new Adapter() });

describe('<LoginModal />', () => {
    let props = {
        showModal: true,
        submitted: false,
        error: '',
        switch: jest.fn(),
        clearLoginError: jest.fn()
    }

    describe('has a <FormModal /> component', () => {
        const wrapper = shallow(<LoginModal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find(FormModal).length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find(FormModal).first().children()).toEqual(wrapper.children());
        });

        it('that takes the necessary props', () => {
            let formModal = wrapper.find(FormModal).first();
            expect(formModal.props().showModal).toEqual(props.showModal);
            expect(formModal.props().loading).toEqual(wrapper.state().loading);
            expect(formModal.props().enabled).toEqual(wrapper.state().username && wrapper.state().password);
            expect(formModal.props().submit).toBe(wrapper.instance().submit);
        });
    });

    describe('has two <Textfield /> components', () => {
        const wrapper = shallow(<LoginModal {...props} />);
        it('that are rendered', () => {
            expect(wrapper.find(TextField).length).toBe(2);
        });

        it('that take the necessary props', () => {
            let username = wrapper.find(TextField).first();
            let password = wrapper.find(TextField).last();

            expect(username.props().onKeyPress).toEqual(wrapper.instance().handleKeyPress);
            expect(username.props().handleChange).toEqual(wrapper.instance().handleChange);
            expect(username.props().value).toEqual(wrapper.state().username);
            expect(username.props().errorText).toEqual(props.error);

            expect(password.props().onKeyPress).toEqual(wrapper.instance().handleKeyPress);
            expect(password.props().handleChange).toEqual(wrapper.instance().handleChange);
            expect(password.props().value).toEqual(wrapper.state().password);
            expect(password.props().password).toBe(true);
        });
        
    });

    describe('has a link', () => {
        const wrapper = shallow(<LoginModal {...props}/>);
        it('that is rendered', () => {
            expect(wrapper.find('.link').length).toBe(1);
        });

        it('that is passed an onClick function', () => {
            expect(wrapper.find('.link').first().props().onClick).toEqual(props.switch);
        });
    });

    describe('has a handleChange function', () => {
        const wrapper = shallow(<LoginModal {...props} />);
        it('that updates the state correctly', () => {
            let event = {
                target: {
                    name: 'Username',
                    value: 'thing'
                }
            }
            wrapper.instance().handleChange(event);
            expect(wrapper.state().username).toBe(event.target.value);

            event.target.name = 'Password';
            event.target.value = 'words';
            wrapper.instance().handleChange(event);
            expect(wrapper.state().password).toBe(event.target.value);
        });

        it('that calls clearLoginError', () => {
            expect(props.clearLoginError.mock.calls.length).toBe(2);
        });
    });
});