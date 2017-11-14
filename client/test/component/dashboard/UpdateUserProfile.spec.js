import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import UpdateUserProfile
  from '../../../components/dashboard/presentation/UpdateUserProfile.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<UpdateUserProfile
  {...mockData.updateUserProfile.props}/>);
  return {
    wrapper,
    ...mockData.updateUserProfile.props
  };
};
configure({ adapter: new Adapter() });
describe('UpdateUserProfile Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
  });
  it('should expect component to have a imageUrl props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().imageUrl).toBeTruthy();
  });
  it('should expect component to have updateUserProfile props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().updateUserProfile).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#email');
    input.simulate(
      'change',
      {
        target: {
          name: 'email',
          value: 'newEmail@me.com'
        }
      }
    );
    expect(wrapper.state().email).toEqual('newEmail@me.com');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().error).toEqual('');
  });
});
