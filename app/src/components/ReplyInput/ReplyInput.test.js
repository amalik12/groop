import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../Button';
import { ReplyInput } from './ReplyInput';

Enzyme.configure({ adapter: new Adapter() });

describe('<ReplyInput />', () => {
    let props = {
        toggleReply: jest.fn()
    }
    const wrapper = shallow(<ReplyInput {...props} />);

    describe('has a .ReplyInput', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.ReplyInput').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.ReplyInput').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has an input', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.reply-input-inner').length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find('.reply-input-inner').first().props().onKeyPress).toEqual(wrapper.instance().handleKeyPress);
        });
    });

    describe('has a <Button/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Button).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find(Button).first().props().onClick).toEqual(props.toggleReply);
        });
    });
});