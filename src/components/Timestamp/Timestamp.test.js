import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';

import Timestamp from './Timestamp';

Enzyme.configure({ adapter: new Adapter() });

describe('<Timestamp />', () => {
    let time = Date.now();
    const wrapper = shallow(<Timestamp time={time} />);
    wrapper.instance().timer = jest.fn()
    
    it('renders a span', () => {
        expect(wrapper.find('span').length).toBe(1);
    });

    it('displays the correct time', () => {
        expect(wrapper.find('span').first().text()).toBe(moment(time).fromNow());
    });
});