import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Avatar from './Avatar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Avatar />', () => {
    const user = {name: 'Bob', avatar: 'thing.png'};
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Avatar user={user} />, div);
    });

    it('renders an `.Avatar`', () => {
        const wrapper = shallow(<Avatar user={user} />);
        expect(wrapper.find('.Avatar').length).toBe(1);
    });

    it('sets the src attribute', () => {
        const wrapper = shallow(<Avatar user={user} />);
        expect(wrapper.find('img').prop('src')).toBe('/images/thing.png');
    });
    
    it('sets the alt attribute', () => {
        const wrapper = shallow(<Avatar user={user} />);
        expect(wrapper.find('img').prop('alt')).toBe('Bob avatar');
    });
});