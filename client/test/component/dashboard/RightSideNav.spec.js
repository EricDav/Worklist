import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import RightSideNav
  from '../../../components/dashboard/presentation/RightSideNav.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<RightSideNav {...mockData.rightSideNav.props}/>);
  return {
    wrapper,
    ...mockData.rightSideNav.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
  it('should expect component to have a handleOnchange props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnchange).toBeTruthy();
  });
  it('should expect component to have a users props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().users).toBeTruthy();
  });
  it('should expect component to have a handleOnchange props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().collaborators).toBeTruthy();
  });
});
