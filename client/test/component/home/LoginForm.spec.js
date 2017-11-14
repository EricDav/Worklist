import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import LoginForm
  from '../../../components/home/presentation/LoginForm.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<LoginForm
  {...mockData.login.props}/>);
  return {
    wrapper,
    ...mockData.login.props
  };
};
configure({ adapter: new Adapter() });
describe('LoginForm Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(14);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should expect component to have an errorMessage props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().errorMessage).toBeTruthy();
  });
  it('should expect component to have userSigninRequest props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().userSigninRequest).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#username');
    input.simulate(
      'change',
      {
        target: {
          name: 'userName',
          value: 'Pythagoras'
        }
      }
    );
    expect(wrapper.state().userName).toEqual('Pythagoras');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('form');
    input.simulate('submit');
    expect(wrapper.state().showError).toEqual(true);
  });
  it('should update the state when onFocus is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#username');
    input.simulate('focus');
    expect(wrapper.state().showError).toEqual(false);
  });
});
