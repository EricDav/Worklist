import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import Preloader
  from '../../../components/dashboard/presentation/Preloader.jsx';

const setup = () => {
  const wrapper = mount(<Preloader/>);
  return {
    wrapper,
  };
};
configure({ adapter: new Adapter() });
describe('User Component', () => {
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(29);
  });
});
