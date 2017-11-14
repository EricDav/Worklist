import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import ForgetPasswordVerificationForm
  from
  '../../../components/home/presentation/ForgetPasswordVerificationForm.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<ForgetPasswordVerificationForm
  {...mockData.verification.props}/>);
  return {
    wrapper,
    ...mockData.verification.props
  };
};
configure({ adapter: new Adapter() });
describe('UploadImageModal Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should expect component to have a errorMessage props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().errorMessage).toBeTruthy();
  });
  it('should expect component to have a setError props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().setError).toBeTruthy();
  });
  it('should expect component to have sendSecretCode props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().sendSecretCode).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#email');
    input.simulate(
      'change',
      {
        target: {
          name: 'email',
          value: 'for@we.com'
        }
      }
    );
    expect(wrapper.state().email).toEqual('for@we.com');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('form');
    input.simulate('submit');
    expect(wrapper.state().showError).toEqual(true);
  });
});
