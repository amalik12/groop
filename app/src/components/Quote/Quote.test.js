import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../Message';
import Quote from './Quote';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

Enzyme.configure({ adapter: new Adapter() });

describe('<Quote />', () => {
    let props = {
        user: {name: 'Bob'},
        text: 'stuff',
        creation_time: Date.now()
    }
    const wrapper = shallow(<Quote {...props} />);

    describe('has a .Quote', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.Quote').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Quote').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has an <Avatar/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Avatar).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find(Avatar).first().props().user).toEqual(props.user);
        });
    });

    it('renders the user name', () => {
        expect(wrapper.find('.quote-sender').first().text()).toBe(props.user.name);
    });

    it('renders the quote text', () => {
        expect(wrapper.find('.quote-text').first().text()).toBe(props.text);
    });

    describe('has a <Timestamp/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Timestamp).length).toBe(1);
        });

        it('that is passed the necessary props', () => {
            expect(wrapper.find(Timestamp).first().props().time).toEqual(props.creation_time);
        });
    });
});