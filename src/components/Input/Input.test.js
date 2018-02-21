import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Input } from './Input';

Enzyme.configure({ adapter: new Adapter() });

describe('<Input />', () => {
    let room = { name: 'room', creation_time: Date.now(), current_users: [], _id: -1 };

    it('renders a textarea', () => {
        const wrapper = shallow(<Input room={room} />);
        expect(wrapper.find('textarea').length).toBe(1);
    });
});