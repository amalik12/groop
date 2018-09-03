import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageGroup from './MessageGroup';
import Message from '../Message';

Enzyme.configure({ adapter: new Adapter() });

describe('<MessageGroup />', () => {
    let props = {
        messages: []
    }
    const wrapper = shallow(<MessageGroup {...props} />);

    describe('has a .MessageGroup', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.MessageGroup').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.MessageGroup').first().children()).toEqual(wrapper.children());
        });
    });

    describe('has an array of <Message/> components', () => {
        beforeAll(() => {
            let message = {text: 'words'}
            for (let index = 0; index < 3; index++) {
                props.messages.push({...message, key: index});
            }
            wrapper.setProps(props);
        })

        it('that are rendered', () => {
            expect(wrapper.find(Message).length).toBe(3);
        });

        it('that are passed the necessary props', () => {
            let first = wrapper.find(Message).first();
            expect(first.props().simple).toBe(false);
            expect(first.props().text).toEqual(props.messages[0].text);

            let second = wrapper.find(Message).get(1);
            expect(second.props.simple).toBe(true);
            expect(second.props.text).toEqual(props.messages[0].text);

            let last = wrapper.find(Message).last();
            expect(last.props().simple).toBe(true);
            expect(last.props().text).toEqual(props.messages[0].text);
        });
    });
});