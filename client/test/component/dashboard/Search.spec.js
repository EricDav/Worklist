import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Search
  from '../../../components/dashboard/presentation/Search.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<Search {...mockData.search.props}/>);
  return {
    wrapper,
    ...mockData.search.props
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
  it('should expect component to have a handleOnchange props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().handleOnchange).toBeTruthy();
  });
});
