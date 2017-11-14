import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Task
  from '../../../components/dashboard/presentation/Task.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Task {...mockData.task.props}/>);
  return {
    wrapper,
    ...mockData.task.props
  };
};
configure({ adapter: new Adapter() });
describe('Taskboard Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
  });
  it('should expect component to have a status props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().status).toBeTruthy();
  });
  it('should expect component to have a users props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().users).toBeTruthy();
  });
  it('should expect component to have a name props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().name).toBeTruthy();
  });
  it('should expect component to have a assignTo props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().assignTo).toBeTruthy();
  });
  it('should expect component to have a colorCode props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().colorCode).toBeTruthy();
  });
});
