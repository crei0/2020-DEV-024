import React from 'react';
import { shallow } from 'enzyme';

import BoardCell from './BoardCell';

describe('BoardCell', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<BoardCell />);
    
    expect(wrapper.find('div').length).toEqual(1);
  });
});
