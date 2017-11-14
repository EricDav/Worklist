import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import TaskBoard
  from '../../../components/dashboard/presentation/TaskBoard.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<TaskBoard {...mockData.taskboard.props}/>);
  return {
    wrapper,
    ...mockData.taskboard.props
  };
};
configure({ adapter: new Adapter() });
describe('Taskboard Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('li').length).toBe(1);
  });
  it('should expect component to have a styles props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().styles).toBeTruthy();
  });
  it('should expect component to have a width props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().width).toBeTruthy();
  });
  it('should expect component to have a todolist props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().todolist).toBeTruthy();
  });
  it('should expect component to have a currentUserId props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().currentUserId).toBeTruthy();
  });
});
