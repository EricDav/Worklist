import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Collaborator
  from '../../../components/dashboard/presentation/Collaborator.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Collaborator {...mockData.collaborator.props}/>);
  return {
    wrapper,
    ...mockData.collaborator.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('li').length).toBe(1);
  });
  it('should expect component to have a userName props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().userName).toBeTruthy();
  });
});
