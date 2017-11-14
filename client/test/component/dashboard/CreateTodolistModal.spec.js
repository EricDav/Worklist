import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import CreateTodolistModal
  from '../../../components/dashboard/presentation/CreateTodolistModal.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<CreateTodolistModal
  {...mockData.createTodolistModal.props}/>);
  return {
    wrapper,
    ...mockData.createTodolistModal.props
  };
};
configure({ adapter: new Adapter() });
describe('CreateTodolistModal Component', () => {
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
  it('should expect component to have a setError props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().setError).toBeTruthy();
  });
  it('should expect component to have createTodolist props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().createTodolist).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('input');
    input.simulate(
      'change',
      {
        target: {
          name: 'name',
          value: 'worklist'
        }
      }
    );
    expect(wrapper.state().name).toEqual('worklist');
  });
  it('should update the state when onClick is called', () => {
    const { wrapper } = setup();
    const cancel = wrapper.find('#clickMe');
    cancel.simulate('click');
    expect(wrapper.state().name).toEqual('');
    expect(wrapper.state().nameError).toEqual('');
    expect(wrapper.state().showError).toEqual(false);
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().name).toEqual('');
    expect(wrapper.state().nameError).toEqual('');
  });
  it('should update the state when onFocus is called', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    form.simulate('focus');
    expect(wrapper.state().nameError).toEqual('');
    expect(wrapper.state().showError).toEqual(false);
  });
});
