import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginModal from './LoginModal';
import FormModal from '../FormModal';
import TextField from '../TextField';

Enzyme.configure({ adapter: new Adapter() });

describe('<LoginModal />', () => {
    let props = {
        showModal: true,
        submitted: false,
        error: '',
        switch: jest.fn(),
        setError: jest.fn()
    }

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginModal />, div);
    });

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
            expect(formModal.props().submitted).toEqual(props.submitted);
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
            expect(username.props().label).toEqual('Username');
            expect(username.props().onKeyPress).toEqual(wrapper.instance().handleKeyPress);
            expect(username.props().handleChange).toEqual(wrapper.instance().handleChange);
            expect(username.props().value).toEqual(wrapper.state().username);
            expect(username.props().errorText).toEqual(props.error);

            expect(password.props().label).toEqual('Password');
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

        it('that calls setError', () => {
            expect(props.setError.mock.calls.length).toBe(2);
        });
    });

    describe('has a handleKeyPress function', () => {
        const wrapper = shallow(<LoginModal {...props} />);
        wrapper.instance().submit = jest.fn();
        wrapper.update();

        it('that only runs if Enter is pressed', () => {
            let event = {
                key: 'F'
            }
            wrapper.instance().handleKeyPress(event);
            expect(wrapper.instance().submit.mock.calls.length).toBe(0);
        });

        it('that only submits if both the username and password are filled', () => {
            let event = {
                key: 'Enter', 
                preventDefault: jest.fn()
            }
            wrapper.instance().handleKeyPress(event);
            expect(wrapper.instance().submit.mock.calls.length).toBe(0);

            wrapper.setState({username: 'dsf', password: ''});
            wrapper.instance().handleKeyPress(event);
            expect(wrapper.instance().submit.mock.calls.length).toBe(0);

            wrapper.setState({ username: '', password: 'dsfdsf' });
            wrapper.instance().handleKeyPress(event);
            expect(wrapper.instance().submit.mock.calls.length).toBe(0);

            wrapper.setState({ username: 'dsf', password: 'dsfdsf' });
            wrapper.instance().handleKeyPress(event);
            expect(wrapper.instance().submit.mock.calls.length).toBe(1);
        });
    });
});