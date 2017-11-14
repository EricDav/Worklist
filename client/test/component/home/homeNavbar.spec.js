import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import HomeNavbar
  from '../../../components/home/presentation/HomeNavbar.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<HomeNavbar {...mockData.homeNavbar.props}/>);
  return {
    wrapper,
    ...mockData.homeNavbar.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
  it('should expect component to have a handleOnclick props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnclick).toBeTruthy();
  });
});
