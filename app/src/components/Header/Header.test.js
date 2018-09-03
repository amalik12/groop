import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Header } from './Header';
import Timestamp from '../Timestamp';
import Members from '../Members';

Enzyme.configure({ adapter: new Adapter() });

describe('<Header />', () => {
    let room = { name: 'room', creation_time: Date.now(), current_users: [], _id: -1 };
    const wrapper = shallow(<Header room={room} />);

    it('renders .Header', () => {
        expect(wrapper.find('.Header').length).toBe(1);
    });

    it('renders a .Header that contains everything else', () => {
        expect(wrapper.find('.Header').children()).toEqual(wrapper.children());
    });

    it('renders a .room-info', () => {
        expect(wrapper.find('.room-info').length).toBe(1);
    });

    it('renders a .room-name', () => {
        expect(wrapper.find('.room-name').length).toBe(1);
    });

    it('passes the name property of room to .room-name', () => {
        expect(wrapper.find('.room-name').first().text()).toBe(room.name);
    });

    it('renders a .creation-time', () => {
        expect(wrapper.find('.creation-time').length).toBe(1);
    });

    it('passes the creation_time property of room to the <Timestamp /> component', () => {
        expect(wrapper.find(Timestamp).first().props().time).toBe(room.creation_time);
    });

    it('renders a <Timestamp /> component', () => {
        expect(wrapper.find(Timestamp).length).toBe(1);
    });

    it('renders a <Members /> component', () => {
        expect(wrapper.find(Members).length).toBe(1);
    });
});