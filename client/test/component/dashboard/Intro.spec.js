import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Intro
  from '../../../components/dashboard/presentation/Intro.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Intro {...mockData.intro.props}/>);
  return {
    wrapper,
    ...mockData.intro.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('h3').length).toBe(2);
    expect(wrapper.find('center').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
  it('should expect component to have a styles props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().styles).toBeTruthy();
  });
  it('should expect component to have a width props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().width).toBeTruthy();
  });
  it('should expect component to have a currentUser props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().currentUser).toBeTruthy();
  });
});
