import React from 'react';
import { App } from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from '../Header';
import SigninModal from '../SigninModal';
import MessageList from '../MessageList';
import MembersModal from '../MembersModal/MembersModal';
import Input from '../Input';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let socket = { name: '' };
  let location = { pathname: '/fddss'}
  let props = {
    auth: jest.fn(() => new Promise((resolve, reject) => {})),
    getRoomInfo: jest.fn(() => new Promise((resolve, reject) => {})),
    getRoomMessages: jest.fn(() => new Promise((resolve, reject) => {})),
    isLoggedIn: false
  }
  
  const wrapper = shallow(<App {...props} location={location} socket={socket}/>);

  describe('has a .App', () => {
    it('that is rendered', () => {
      expect(wrapper.find('.App').length).toBe(1);
    });

    it('that contains everything else', () => {
      expect(wrapper.find('.App').first().children()).toEqual(wrapper.children());
    });
  });

  it('renders a <SigninModal /> component', () => {
    expect(wrapper.find(SigninModal).length).toBe(1);
  });

  it('passes a socket to the <SigninModal /> component', () => {
    expect(wrapper.find(SigninModal).first().props().socket).toEqual(socket);
  });

  it('renders a <Header /> component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('renders a <MembersModal /> component', () => {
    expect(wrapper.find(MembersModal).length).toBe(1);
  });

  it('renders a <MessageList /> component', () => {
    expect(wrapper.find(MessageList).length).toBe(1);
  });

  it('renders a <Input /> component', () => {
    expect(wrapper.find(Input).length).toBe(1);
  });
});