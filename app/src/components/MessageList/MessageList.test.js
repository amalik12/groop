import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MessageList } from './MessageList'
import Message from '../Message';

Enzyme.configure({ adapter: new Adapter() });

describe('<MessageList />', () => {
    let messages = [{
        user: {
            avatar: 'default-1.png',
            name: 'Joe'
        },
        creation_time: Date.now(),
        text: 'Some text...'
    }]
    const wrapper = shallow(<MessageList messages={messages} />);
    
    describe('has a .MessageList', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.MessageList').length).toBe(1);
        });
    });

    it('renders its messages', () => {
        expect(wrapper.find(Message).length).toBe(messages.length);
    });
});