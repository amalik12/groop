import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Members } from './Members';
import Avatar from '../Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Members />', () => {
    describe('has an outer div', () => {
        let props = {
            current_users: [],
            showModal: jest.fn()
        }
        const wrapper = shallow(<Members {...props}/>);

        it('that is rendered', () => {
            expect(wrapper.find('.Members').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Members').children()).toEqual(wrapper.children());
        });

        it('that is passed an onClick function', () => {
            expect(wrapper.find('.Members').props().onClick).toEqual(props.showModal);
        });
    });
    
    describe('has a .member-count', () => {
        it('that renders properly for one current user', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            const wrapper = shallow(<Members current_users={[user]} />);
            expect(wrapper.find('.member-count').first().text()).toBe('1 member');
        });

        it('that renders properly for five current users', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            let input = [];
            for (let index = 0; index < 5; index++) {
                input.push(user);
            }
            const wrapper = shallow(<Members current_users={input} />);
            expect(wrapper.find('.member-count').first().text()).toBe('5 members');
        });
    });

    describe('has an Avatar component list', () => {
        it('that does not render for zero users', () => {
            const wrapper = shallow(<Members current_users={[]} />);
            expect(wrapper.find(Avatar).length).toBe(0);
        });

        it('that renders properly for one current user', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            const wrapper = shallow(<Members current_users={[user]} />);
            expect(wrapper.find(Avatar).length).toBe(1);
        });

        it('that renders properly for five current users', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            let input = [];
            for (let index = 0; index < 5; index++) {
                input.push(user);
            }
            const wrapper = shallow(<Members current_users={input} />);
            expect(wrapper.find(Avatar).length).toBe(3);
        });
    });

    describe('has a .member-more', () => {
        it('that does not render for less than four users', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            let input = [];
            for (let index = 0; index < 3; index++) {
                input.push(user);
            }
            const wrapper = shallow(<Members current_users={input} />);
            expect(wrapper.find('.member-more').length).toBe(0);
        });

        it('that renders properly for five current users', () => {
            let user = { name: 'Bob', avatar: 'default-1.png' };
            let input = [];
            for (let index = 0; index < 5; index++) {
                input.push(user);
            }
            const wrapper = shallow(<Members current_users={input} />);
            expect(wrapper.find('.member-more').length).toBe(1);
            expect(wrapper.find('.member-more').first().text()).toBe('+2');
        });
    });
});