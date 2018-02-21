import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SigninModal } from './SigninModal';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';

Enzyme.configure({ adapter: new Adapter() });

describe('<SigninModal />', () => {
    let props = {
        showModal: true
    }

    describe('has an outer div', () => {
        const wrapper = shallow(<SigninModal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find('div').length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find('div').first().children()).toEqual(wrapper.children());
        });
    });

    describe('displays content', () => {
        const wrapper = shallow(<SigninModal {...props} />);
        it('that is correctly switched between', () => {
            expect(wrapper.find(LoginModal).length).toBe(1);
            wrapper.instance().switchModal();
            wrapper.update();
            expect(wrapper.find(RegisterModal).length).toBe(1);
        });

        it('that takes the necessary props', () => {
            let modal = wrapper.find(RegisterModal).first();
            expect(modal.props().showModal).toEqual(props.showModal);
            expect(modal.props().signin).toEqual(wrapper.instance().signin);
            expect(modal.props().switch).toEqual(wrapper.instance().switchModal);
            expect(modal.props().setError).toEqual(wrapper.instance().setError);
            expect(modal.props().submitted).toEqual(wrapper.state().submitted);
            expect(modal.props().error).toEqual(wrapper.state().error);

            wrapper.instance().switchModal();
            wrapper.update();

            modal = wrapper.find(LoginModal).first();
            expect(modal.props().showModal).toEqual(props.showModal);
            expect(modal.props().signin).toEqual(wrapper.instance().signin);
            expect(modal.props().switch).toEqual(wrapper.instance().switchModal);
            expect(modal.props().setError).toEqual(wrapper.instance().setError);
            expect(modal.props().submitted).toEqual(wrapper.state().submitted);
            expect(modal.props().error).toEqual(wrapper.state().error);
        });
    });

    it('correctly sets its error prop', () => {
        const wrapper = shallow(<SigninModal {...props} />);
        wrapper.instance().setError('words');
        expect(wrapper.state().error).toEqual('words');
    });
});