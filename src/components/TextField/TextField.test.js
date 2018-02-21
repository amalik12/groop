import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TextField from './TextField';

Enzyme.configure({ adapter: new Adapter() });

describe('<TextField />', () => {
    let props = {
        onKeyPress: jest.fn(),
        handleChange: jest.fn(),
        errorText: '',
        label: 'Text',
        password: false,
        value: ''
    }

    const wrapper = shallow(<TextField {...props} />);

    describe('has an outer div', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.textfield').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.textfield').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has an input', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.textfield-input').length).toBe(1);
        });

        it('that takes the required props', () => {
            let input = wrapper.find('.textfield-input').first();
            expect(input.props().name).toEqual(props.label);
            expect(input.props().onKeyPress).toEqual(props.onKeyPress);
            expect(input.props().value).toEqual(props.value);
            expect(input.props().onChange).toEqual(props.handleChange);
            expect(input.props().onFocus).toEqual(wrapper.instance().focusOn);
            expect(input.props().onBlur).toEqual(wrapper.instance().focusOff);
        });
    });

    describe('has an label', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.textfield-label').length).toBe(1);
        });

        it('that displays the correct text', () => {
            expect(wrapper.find('.textfield-label').first().text()).toEqual(props.label);
        });
    });

    describe('has a span', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.textfield-error').length).toBe(1);
        });

        it('that displays the correct text', () => {
            expect(wrapper.find('.textfield-error').first().text()).toEqual(props.errorText);
        });
    });

    describe('when errorText is defined', () => {
        beforeEach(() => {
            wrapper.setProps({ errorText: 'text' });
        });
        
        it('sets the invalid class', () => {
            expect(wrapper.find('div').first().props().className).toBe('textfield invalid');
            wrapper.setProps({ errorText: '' });
        });

        it('renders the error text', () => {
            expect(wrapper.find('.textfield-error').first().text()).toEqual('text');
        });
    });
    
    it('sets the type if password prop is true', () => {
        wrapper.setProps({ password: true });
        expect(wrapper.find('input').first().props().type).toBe('password');
    });

    it('sets the has-input class if value prop is defined', () => {
        wrapper.setProps({ value: 'words' });
        expect(wrapper.find('label').first().props().className).toBe('textfield-label has-input');
        wrapper.setProps({ value: '' });
        expect(wrapper.find('label').first().props().className).toBe('textfield-label');
    });

    it('sets the focused class if focused', () => {
        wrapper.find('input').simulate('focus');
        expect(wrapper.find('label').first().props().className).toBe('textfield-label textfield-label-focused');
        wrapper.find('input').simulate('blur');
        expect(wrapper.find('label').first().props().className).toBe('textfield-label');
    });

});