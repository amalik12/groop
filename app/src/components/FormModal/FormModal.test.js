import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormModal from './FormModal';
import Modal from '../Modal';
import Button from '../Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<FormModal />', () => {
    let props;
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FormModal />, div);
    });

    describe('has a <Modal /> component', () => {
        const wrapper = shallow(<FormModal {...props} />);
        it('that is rendered', () => {
            expect(wrapper.find(Modal).length).toBe(1);
        });

        it('that contains everything else', () => {
            expect(wrapper.find(Modal).first().children()).toEqual(wrapper.children());
        });
    });

    it('renders a .modal-body', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find('.modal-body').length).toBe(1);
    });

    it('passes the necessary props to the <Modal /> component', () => {
        const wrapper = shallow(<FormModal showModal={true} submitted={false} title={'modal'}/>);
        expect(wrapper.find(Modal).props().showModal).toBe(true);
        expect(wrapper.find(Modal).props().submitted).toBe(false);
        expect(wrapper.find(Modal).props().title).toBe('modal');
    });
    
    it('renders a .modal-footer', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find('.modal-footer').length).toBe(1);
    });

    it('renders a <Button /> component', () => {
        const wrapper = shallow(<FormModal />);
        expect(wrapper.find(Button).length).toBe(1);
    });

    it('passes the necessary props to the <Button /> component', () => {
        props = {
            submit: jest.fn(),
            loading: false,
            enabled: true
        }
        const wrapper = shallow(<FormModal {...props} />);
        expect(wrapper.find(Button).props().onClick).toEqual(props.submit);
        expect(wrapper.find(Button).props().loading).toBe(props.loading);
        expect(wrapper.find(Button).props().enabled).toBe(props.enabled);
        expect(wrapper.find(Button).props().modal).toBe(true);
    });

    it('renders children when passed in', () => {
        const wrapper = shallow((
            <FormModal>
                <div className="unique" />
            </FormModal>
        ));
        expect(wrapper.contains(<div className="unique" />)).toBe(true);
    });
});