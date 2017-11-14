import React from 'react';
import { mount, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

import UploadImageModal
  from '../../../components/dashboard/presentation/UploadImageModal.jsx';
import mockData from '../../mockData';

const setup = () => {
  const wrapper = mount(<UploadImageModal
  {...mockData.uploadImageModal.props}/>);
  return {
    wrapper,
    ...mockData.uploadImageModal.props
  };
};
configure({ adapter: new Adapter() });
describe('UploadImageModal Component', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should render neccessary elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(2);
    expect(wrapper.find('nav').length).toBe(1);
  });
  it('should expect component to have a imageUrl props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().imageUrl).toBeTruthy();
  });
  it('should expect component to have updateProfilePicture props', () => {
    const { wrapper } = setup();
    expect(wrapper.props().updateProfilePicture).toBeTruthy();
  });
  it('should update the state when onChange is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('input');
    input.simulate(
      'change',
      {
        target: {
          name: 'files',
          files: ['david.jpg']
        }
      }
    );
    expect(wrapper.state().files).toEqual('david.jpg');
  });
  it('should update the state when onSubmit is called', () => {
    const { wrapper } = setup();
    const input = wrapper.find('input');
    input.simulate('submit');
    expect(wrapper.state().files).toEqual('');
  });
});
