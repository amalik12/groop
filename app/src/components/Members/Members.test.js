import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Members } from './Members';
import Avatar from '../Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Members />', () => {
    let wrapper;
    let props;
    beforeEach(() => {
        props = {
            current_users: [],
            showModal: jest.fn()
        }
        wrapper = shallow(<Members {...props} />);
    })

    describe('has an outer div', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.Members').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Members').children()).toEqual(wrapper.children());
        });

        it('that is passed an onClick function', () => {
            expect(wrapper.find('.Members').props().onClick).toBe(props.showModal);
        });
    });
    
    describe('has a .member-count', () => {
        it('that renders properly for one current user', () => {
            props.current_users.push({ name: 'Bob', avatar: 'default-1.png', _id: 0 });
            wrapper.setProps(props);
            expect(wrapper.find('.member-count').first().text()).toBe('1 member');
        });

        it('that renders properly for five current users', () => {
            for (let index = 0; index < 5; index++) {
                props.current_users.push({ name: 'Bob', avatar: 'default-1.png', _id: index });
            }
            wrapper.setProps(props);
            expect(wrapper.find('.member-count').first().text()).toBe('5 members');
        });
    });

    describe('has an Avatar component list', () => {
        it('that does not render for zero users', () => {
            expect(wrapper.find(Avatar).length).toBe(0);
        });

        it('that renders properly for one current user', () => {
            let user = { name: 'Bob', avatar: 'default-1.png', _id: 0 }
            props.current_users.push(user);
            wrapper.setProps(props);
            expect(wrapper.find(Avatar).length).toBe(1);
            expect(wrapper.find(Avatar).first().props().user).toEqual(user);
        });

        it('that renders properly for five current users', () => {
            for (let index = 0; index < 5; index++) {
                props.current_users.push({ name: 'Bob', avatar: 'default-1.png', _id: index });
            }
            wrapper.setProps(props);
            expect(wrapper.find(Avatar).length).toBe(3);
        });
    });

    describe('has a .member-more', () => {
        it('that does not render for less than four users', () => {
            for (let index = 0; index < 3; index++) {
                props.current_users.push({ name: 'Bob', avatar: 'default-1.png', _id: index });
            }
            wrapper.setProps(props);
            expect(wrapper.find('.member-more').length).toBe(0);
        });

        it('that renders properly for five current users', () => {
            for (let index = 0; index < 5; index++) {
                props.current_users.push({ name: 'Bob', avatar: 'default-1.png', _id: index });
            }
            wrapper.setProps(props);
            expect(wrapper.find('.member-more').length).toBe(1);
            expect(wrapper.find('.member-more').first().text()).toBe('+2');
        });
    });
});