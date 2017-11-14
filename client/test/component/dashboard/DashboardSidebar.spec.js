import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import DashboardSidebar
  from '../../../components/dashboard/presentation/DashboardSidebar.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<DashboardSidebar
    {...mockData.dashboardSidebar.props}/>);
  return {
    wrapper,
    ...mockData.dashboardSidebar.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('div').length).toBe(6);
  });
  it('should expect component to have a fullName props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().fullName).toBeTruthy();
  });
  it('should expect component to have a imageUrl props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().imageUrl).toBeTruthy();
  });
  it('should expect component to have a todolists props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().todolists).toBeTruthy();
  });
  it('should expect component to have a handleOnclick props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnclick).toBeTruthy();
  });
});
