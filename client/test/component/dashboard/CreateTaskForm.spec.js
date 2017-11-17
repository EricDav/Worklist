import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import CreateTaskForm
  from '../../../components/dashboard/presentation/CreateTaskForm';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<CreateTaskForm
    {...mockData.createTaskForm.props}
  />);
  return {
    wrapper,
    ...mockData.createTaskForm.props
  };
};
configure({ adapter: new Adapter() });
describe('CreateTodolistModal Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(18);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(11);
    expect(wrapper.find('button').length).toBe(1);
  });
  it('should expect component to have a errorMessage props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().errorMessage).toBeTruthy();
  });
  it('should expect component to have rightSideNav props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().rightSideNav).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('#assignTo');
    input.simulate(
      'change',
      {
        target: {
          name: 'assignTo',
          value: 'signup'
        }
      }
    );
    expect(wrapper.state().disableAssignTaskToSelf).toEqual(true);
    expect(wrapper.state().assignTo).toEqual('signup');
  });
  it('should update the state when onClick is called', () => {
    const { wrapper } = setup();
    const cancel = wrapper.find('#test5');
    cancel.simulate(
      'click',
      {
        target: {
          textContent: 'clear'
        }
      }
    );
    expect(wrapper.state().disableAssignTaskToMember).toEqual(false);
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().error)
      .toEqual('Invalid task name. Task name must contain \
only character and number only');
  });
});
