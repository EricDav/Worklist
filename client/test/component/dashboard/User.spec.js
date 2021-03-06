import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import User
  from '../../../components/dashboard/presentation/User.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<User {...mockData.user.props}/>);
  return {
    wrapper,
    ...mockData.user.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('.group-title').length).toBe(1);
  });
  it('should expect component to have a fullName props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().fullName).toBeTruthy();
  });
  it('should expect component to have a userName props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().userName).toBeTruthy();
  });
  it('should expect component to have a handleOnclick props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnclick).toBeTruthy();
  });
});
