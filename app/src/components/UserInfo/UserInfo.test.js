import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UserInfo from './UserInfo';
import Avatar from '../Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('<UserInfo />', () => {
    let user = { name: 'Bob', avatar: 'default-1.png' }
    const wrapper = shallow(<UserInfo user={user} />);

    describe('has an outer div', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.user-info').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.user-info').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has an <Avatar /> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Avatar).length).toBe(1);
        });

        it('that is passed the user prop', () => {
            expect(wrapper.find(Avatar).first().props().user).toEqual(user);
        });
    });

    describe('has a .user-info-name', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.user-info-name').length).toBe(1);
        });

        it('that renders the user.name', () => {
            expect(wrapper.find('.user-info-name').first().text()).toEqual(user.name);
        });
    });
});