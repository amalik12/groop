import React from 'react';
import App from './App';
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
  const wrapper = shallow(<App socket={socket}/>);

  it('renders its outer div', () => {
    expect(wrapper.find('.App').length).toBe(1);
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