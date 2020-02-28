import React from 'react';
import { shallow } from 'enzyme';

import Board from './Board';

// Board is rendering correctly?
describe('Board', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Board />);
    
    expect(wrapper.find('div').length).toEqual(1);
  });
});