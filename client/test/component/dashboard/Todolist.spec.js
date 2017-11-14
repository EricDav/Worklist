import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Todolist
  from '../../../components/dashboard/presentation/Todolist.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Todolist {...mockData.todolist.props}/>);
  return {
    wrapper,
    ...mockData.todolist.props
  };
};
configure({ adapter: new Adapter() });
describe('Todolist Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('li').length).toBe(1);
    expect(wrapper.find('i').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });
  it('should expect component to have a name props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().name).toBeTruthy();
  });
  it('should expect component to have a todolist props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().todolists).toBeTruthy();
  });
  it('should contain an onClick function', () => {
    const { wrapper } = setup();
    const aTag = wrapper.find('a');
    aTag.simulate('click');
    // expect(aTag.props().onClick).toHaveBeenCalled();
  });
});
