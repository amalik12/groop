import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MessageList } from './MessageList'
import MessageGroup from '../MessageGroup';

Enzyme.configure({ adapter: new Adapter() });

describe('<MessageList />', () => {
    let messages = [{
        user: {
            avatar: 'default-1.png',
            name: 'Joe',
            _id: 1
        },
        creation_time: Date.now(),
        text: 'Some text...'
    }]

    let wrapper = shallow(<MessageList messages={messages} />);
    
    describe('has a .MessageList', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.MessageList').length).toBe(1);
        });
    });

    it('renders its messages', () => {
        expect(wrapper.find(MessageGroup).length).toBe(1);
    });

    describe('groups the messages', () => {
        beforeEach(() => {
            messages.push({
                user: {
                    avatar: 'default-1.png',
                    name: 'Joe',
                    _id: 1
                },
                creation_time: Date.now(),
                text: 'Some text...'
            })
            wrapper = shallow(<MessageList messages={messages} />);
        })

        it('when messages from the same user arrive within 30 min', () => {
            expect(wrapper.find(MessageGroup).length).toBe(1);
        });
    });

    describe('places messages in a separate group', () => {
        beforeEach(() => {
            messages.push({
                user: {
                    avatar: 'default-1.png',
                    name: 'Bob',
                    _id: 2
                },
                creation_time: Date.now(),
                text: 'Some text...'
            })
            wrapper = shallow(<MessageList messages={messages} />);
        })

        it('when a message arrives from a different user', () => {
            expect(wrapper.find(MessageGroup).length).toBe(2);
        });
    });

    describe('places messages in a separate group', () => {
        beforeEach(() => {
            messages.push({
                user: {
                    avatar: 'default-1.png',
                    name: 'Bob',
                    _id: 2
                },
                creation_time: Date.now() + 1000 * 60 * 32,
                text: 'Some text...'
            })
            wrapper = shallow(<MessageList messages={messages} />);
        })

        it('when a message arrives from the same user after 30 min', () => {
            expect(wrapper.find(MessageGroup).length).toBe(3);
        });
    });
});