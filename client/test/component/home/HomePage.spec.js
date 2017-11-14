import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import { HomePage }
  from '../../../components/home/container/HomePage.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<HomePage
  {...mockData.homepage.props}/>);
  return {
    wrapper,
    ...mockData.homepage.props
  };
};
configure({ adapter: new Adapter() });
describe('Homepage Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(4);
  });
  it('should expect component to have a errorMessage props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().errorMessage).toBeTruthy();
  });
  it('should expect component to have resetUserPassword props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().resetPasswordUser).toBeTruthy();
  });
});
