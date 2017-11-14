import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Priority
  from '../../../components/dashboard/presentation/Priority.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Priority {...mockData.rightSideNav.props}/>);
  return {
    wrapper,
    ...mockData.priority.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('p').length).toBe(3);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('div').length).toBe(2);
  });
  it('should expect component to have a handleOnchange props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnchange).toBeTruthy();
  });
});
