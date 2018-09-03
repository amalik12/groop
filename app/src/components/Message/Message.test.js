import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';

import Message from './Message'
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';
import ReplyInput from '../ReplyInput';
import Quote from '../Quote/Quote';

Enzyme.configure({ adapter: new Adapter() });

describe('<Message />', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            user: {
                avatar: 'default-1.png',
                name: 'Joe'
            },
            creation_time: Date.now(),
            text: 'Some text...',
            simple: false,
            replying: false,
            _id: 4
        }
        wrapper = shallow(<Message {...props} />);
    })

    describe('has a .Message', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.Message').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('.Message').children()).toEqual(wrapper.children());
        });
    });

    describe('has a <Avatar/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Avatar).length).toBe(1);
        });

        it('that is passed the user prop', () => {
            expect(wrapper.find(Avatar).first().props().user).toEqual(props.user);
        });
    });

    describe('has a <Timestamp/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(Timestamp).length).toBe(1);
        });

        it('that is passed the creation_time prop', () => {
            expect(wrapper.find(Timestamp).props().time).toEqual(props.creation_time);
        });
    });

    describe('has a .message-sender', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.message-sender').length).toBe(1);
        });

        it('that is passed the user.name prop', () => {
            expect(wrapper.find('.message-sender').text()).toBe(props.user.name);
        });
    });

    describe('has a .message-text', () => {
        it('that is rendered', () => {
            expect(wrapper.find('.message-text').length).toBe(1);
        });

        it('that is passed the text prop', () => {
            expect(wrapper.find('.message-text').text()).toBe(props.text);
        });
    });

    describe('has a <ReplyInput/> component', () => {
        it('that is rendered', () => {
            expect(wrapper.find(ReplyInput).length).toBe(1);
        });

        it('that is passed the correct props', () => {
            expect(wrapper.find(ReplyInput).props().toggleReply).toBe(wrapper.instance().toggleReply);
            expect(wrapper.find(ReplyInput).props().id).toEqual(props._id);
        });
    });

    describe('when the simple prop is true', () => {
        beforeEach(() => {
            wrapper.setProps({simple: true});
        })

        it('does not render the <Avatar/> component', () => {
            expect(wrapper.find(Avatar).length).toBe(0);
        });

        it('renders the .message-time', () => {
            expect(wrapper.find('.message-time').length).toBe(1);
            expect(wrapper.find('.message-time').text()).toEqual(moment(props.creation_time).format('h:mm A'));
        });

        it('adds a class to .message-details', () => {
            expect(wrapper.find('.message-details.simple').length).toBe(1);
        });

        it('does not render .message-sender', () => {
            expect(wrapper.find('.message-sender').length).toBe(0);
        });

        it('does not render the <Timestamp/> component', () => {
            expect(wrapper.find(Timestamp).length).toBe(0);
        });
    });

    describe('has a <Quote/> component', () => {
        let quote = { text: 'Bob' };
        it('that is rendered when the quote prop is defined', () => {
            expect(wrapper.find(Quote).length).toBe(0);
            wrapper.setProps({quote: quote});
            expect(wrapper.find(Quote).length).toBe(1);
        });

        it('that is passed the correct props', () => {
            wrapper.setProps({ quote: quote });
            expect(wrapper.find(Quote).first().props().text).toBe(quote.text);
        });
    });

    describe('has a reply button', () => {
        it('that is rendered when state.replying is false', () => {
            expect(wrapper.find('.reply-button').length).toBe(1);
            wrapper.setState({ replying: true });
            expect(wrapper.find('.reply-button').length).toBe(0);
        });

        it('that is passed the correct props', () => {
            wrapper.setState({ replying: false });
            expect(wrapper.find('.reply-button').first().props().onClick).toBe(wrapper.instance().toggleReply);
        });
    });
});