import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import ForgetPasswordConfirmationForm
  from
  '../../../components/home/presentation/ForgetPasswordConfirmationForm.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<ForgetPasswordConfirmationForm
  {...mockData.confirmation.props}/>);
  return {
    wrapper,
    ...mockData.confirmation.props
  };
};
configure({ adapter: new Adapter() });
describe('UploadImageModal Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(14);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
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
  it('should expect component to have resetPassword props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().resetPassword).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#password');
    input.simulate(
      'change',
      {
        target: {
          name: 'password',
          value: 'david1996'
        }
      }
    );
    expect(wrapper.state().password).toEqual('david1996');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('form');
    input.simulate('submit');
    expect(wrapper.state().showError).toEqual(true);
  });
});
