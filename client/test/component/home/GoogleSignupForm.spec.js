import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import GoogleSignupForm
  from '../../../components/home/presentation/GoogleSignupForm.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<GoogleSignupForm
  {...mockData.googleSignupForm.props}/>);
  return {
    wrapper,
    ...mockData.googleSignupForm.props
  };
};
configure({ adapter: new Adapter() });
describe('UploadImageModal Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should expect component to have a errorMessage props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().errorMessage).toBeTruthy();
  });
  it('should expect component to have userSignupRequest props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().userSignupRequest).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#username');
    input.simulate(
      'change',
      {
        target: {
          name: 'userName',
          value: 'fola&%'
        }
      }
    );
    expect(wrapper.state().userName).toEqual('fola&%');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('form');
    input.simulate('submit');
    expect(wrapper.state().error).toEqual('Invalid username');
  });
});
