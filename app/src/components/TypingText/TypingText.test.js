import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TypingText } from './TypingText';

Enzyme.configure({ adapter: new Adapter() });

describe('<TypingText />', () => {
    let props = {
        typing_users: [],
        current_user: 1
    }
    const wrapper = shallow(<TypingText {...props} />);

    describe('has a .TypingText', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.TypingText')).toHaveLength(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.TypingText').first().children()).toEqual(wrapper.children());
        });

        it('that has an additional style if typing_users is not empty', () => {
            props.typing_users.push({name: 'Joe', _id: 4})
            wrapper.setProps(props);
            expect(wrapper.find('.TypingText.visible')).toHaveLength(1);
        });
    });

    describe('has an list of typing users', () => {
        beforeEach(() => {
            props.typing_users = []
        })

        it('that is rendered', () => {
            expect(wrapper.find('.typing-message')).toHaveLength(1);
        });

        it('that displays the correct typing message', () => {
            props.typing_users.push({ name: 'Joe', _id: 4 })
            wrapper.setProps(props);
            expect(wrapper.find('.typing-message').first().text()).toBe(props.typing_users[0].name + ' is typing a message...');
            props.typing_users.push({ name: 'Rick', _id: 2 })
            wrapper.setProps(props);
            expect(wrapper.find('.typing-message').first().text()).toBe(props.typing_users[0].name + ' and ' + props.typing_users[1].name + ' are typing a message...');
            props.typing_users.push({ name: 'George', _id: 3 })
            wrapper.setProps(props);
            expect(wrapper.find('.typing-message').first().text()).toBe(props.typing_users[0].name + ', ' + props.typing_users[1].name + ' and ' + props.typing_users[2].name + ' are typing a message...');
        });

        it('that excludes the current user', () => {
            props.typing_users.push({ name: 'Joe', _id: 4 })
            props.typing_users.push({ name: 'Bob', _id: 1 })
            wrapper.setProps(props);
            expect(wrapper.find('.typing-message').first().text()).toBe(props.typing_users[0].name + ' is typing a message...');
        });

        it('that displays a different message for a long list', () => {
            for (let index = 0; index < 4; index++) {
                props.typing_users.push({ name: 'Joe', _id: 4 })
            }
            wrapper.setProps(props);
            expect(wrapper.find('.typing-message').first().text()).toBe('Several users are typing...');
        });
    });
});