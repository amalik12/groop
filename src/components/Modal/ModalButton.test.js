import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ModalButton from './ModalButton';
import ReactModal from 'react-modal';

Enzyme.configure({ adapter: new Adapter() });

describe('<ModalButton />', () => {
    let props = {
        onClick: jest.fn(),
        loading: false
    }
    const wrapper = shallow(<ModalButton {...props}/>);
    
    it('renders a button', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    it('passes in the onClick prop', () => {
        expect(wrapper.find('button').props().onClick).toEqual(props.onClick);
    });

    it('adds a class if enabled prop is false', () => {
        expect(wrapper.find('button').props().className).toBe('modal-button-primary');
        wrapper.setProps({enabled: false});
        expect(wrapper.find('button').props().className).toBe('modal-button-primary disabled');
    });

    it('displays a loader if loading prop is true', () => {
        expect(wrapper.find('button').text()).toBe('Submit');
        wrapper.setProps({ loading: true });
        expect(wrapper.find('.loader').length).toBe(1);
    });
});