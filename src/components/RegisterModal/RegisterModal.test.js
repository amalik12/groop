import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RegisterModal from './RegisterModal';
import FormModal from '../FormModal';
import TextField from '../TextField';

Enzyme.configure({ adapter: new Adapter() });

describe('<RegisterModal />', () => {
    let props = {
        showModal: true,
        submitted: false,
        error: '',
        switch: jest.fn(),
        setError: jest.fn()
    }

    describe('has a <FormModal /> component', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find(FormModal).length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find(FormModal).first().children()).toEqual(wrapper.children());
        });

        it('that takes the necessary props', () => {
            let formModal = wrapper.find(FormModal).first();
            expect(formModal.props().showModal).toEqual(props.showModal);
            expect(formModal.props().submitted).toEqual(props.submitted);
            expect(formModal.props().loading).toEqual(wrapper.state().loading);
            expect(formModal.props().enabled).toEqual(wrapper.state().usernameValid && wrapper.state().passwordValid);
            expect(formModal.props().submit).toBe(wrapper.instance().submit);
        });
    });

    describe('has three <Textfield /> components', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        it('that are rendered', () => {
            expect(wrapper.find(TextField).length).toBe(3);
        });

        it('that take the necessary props', () => {
            let username = wrapper.find(TextField).first();
            let password = wrapper.find(TextField).at(1);
            let confirm = wrapper.find(TextField).last();
            expect(username.props().label).toEqual('Username');
            expect(username.props().handleChange).toEqual(wrapper.instance().handleUsernameChange);
            expect(username.props().value).toEqual(wrapper.state().username);
            expect(username.props().errorText).toEqual(props.error);

            expect(password.props().label).toEqual('Password');
            expect(password.props().handleChange).toEqual(wrapper.instance().handlePasswordChange);
            expect(password.props().value).toEqual(wrapper.state().password);
            expect(password.props().errorText).toEqual(wrapper.state().passwordError);
            expect(password.props().password).toBe(true);

            expect(confirm.props().label).toEqual('Confirm password');
            expect(confirm.props().handleChange).toEqual(wrapper.instance().handlePasswordChange);
            expect(password.props().value).toEqual(wrapper.state().confirm);
            expect(password.props().password).toBe(true);
        });
    });

    describe('has a link', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find('.link').length).toBe(1);
        });

        it('that is passed an onClick function', () => {
            expect(wrapper.find('.link').first().props().onClick).toEqual(props.switch);
        });
    });

    describe('has a handleUsernameChange function', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        wrapper.instance().checkUsername = jest.fn();
        wrapper.instance().checkPassword = jest.fn();
        it('that updates the state correctly', () => {
            let event = {
                target: {
                    name: 'Username',
                    value: 'thing'
                }
            }
            wrapper.instance().handleUsernameChange(event);
            expect(wrapper.state().username).toBe(event.target.value);
            expect(wrapper.state().usernameValid).toBe(false);
        });

        it('that calls setError', () => {
            expect(props.setError.mock.calls.length).toBe(1);
        });
    });

    describe('has a handlePasswordChange function', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        wrapper.instance().checkUsername = jest.fn();
        wrapper.instance().checkPassword = jest.fn();
        it('that updates the state correctly', () => {
            let event = {
                target: {
                    name: 'Confirm password',
                    value: 'thing'
                }
            }
            wrapper.instance().handlePasswordChange(event);
            expect(wrapper.state().confirm).toBe(event.target.value);

            event.target.name = 'Password';
            event.target.value = 'words';
            wrapper.instance().handlePasswordChange(event);
            expect(wrapper.state().password).toBe(event.target.value);
        });
    });

    describe('has a checkPassword function', () => {
        const wrapper = shallow(<RegisterModal {...props} />);
        it('that updates the state correctly', () => {
            wrapper.instance().checkPassword();
            expect(wrapper.state().passwordValid).toBe(false);
            expect(wrapper.state().passwordError).toBe('');

            wrapper.setState({password: 'sdfdsf', confirm: 'dsfdssf'});
            wrapper.instance().checkPassword();
            expect(wrapper.state().passwordValid).toBe(false);
            expect(wrapper.state().passwordError).toBe('Passwords do not match');
            
            wrapper.setState({ password: 'sdf', confirm: 'sdf', passwordError: '' });
            wrapper.instance().checkPassword();
            expect(wrapper.state().passwordValid).toBe(true);
            expect(wrapper.state().passwordError).toBe('');
        });
    });
});