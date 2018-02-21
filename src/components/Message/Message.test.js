import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Message from './Message'
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

Enzyme.configure({ adapter: new Adapter() });

describe('<Message />', () => {
    let props = {
        user: {
            avatar: 'default-1.png',
            name: 'Joe'
        },
        creation_time: Date.now(),
        text: 'Some text...'
    }

    const wrapper = shallow(<Message {...props} />);
    describe('has a .Message', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.Message').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Message').children()).toEqual(wrapper.children());
        });
    });

    describe('has a <Avatar /> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Avatar).length).toBe(1);
        });

        it('that is passed the user prop', () => {
            expect(wrapper.find(Avatar).props().user).toEqual(props.user);
        });
    });

    describe('has a <Timestamp /> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Timestamp).length).toBe(1);
        });

        it('that is passed the creation_time prop', () => {
            expect(wrapper.find(Timestamp).props().time).toEqual(props.creation_time);
        });
    });

    describe('has a .message-sender', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.message-sender').length).toBe(1);
        });

        it('that is passed the user.name prop', () => {
            expect(wrapper.find('.message-sender').text()).toBe(props.user.name);
        });
    });

    describe('has a .message-text', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.message-text').length).toBe(1);
        });

        it('that is passed the text prop', () => {
            expect(wrapper.find('.message-text').text()).toBe(props.text);
        });
    });
});