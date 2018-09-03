import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chat from '../../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { Input } from './Input';
import TypingText from '../TypingText';

Enzyme.configure({ adapter: new Adapter() });
let store = createStore(chat, applyMiddleware(thunkMiddleware));

describe('<Input />', () => {
    let room = { name: 'room', creation_time: Date.now(), current_users: [], _id: -1 };
    let wrapper = shallow(<Input room={room} />);
    describe('has a .Input', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.Input').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Input').first().children()).toEqual(wrapper.children());
        });
    });

    it('renders a textarea', () => {
        expect(wrapper.find('textarea').length).toBe(1);
    });

    it('renders a <TypingText /> component', () => {
        expect(wrapper.find(TypingText).length).toBe(1);
    });
});