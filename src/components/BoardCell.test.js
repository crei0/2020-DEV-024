import React from 'react';
import { shallow } from 'enzyme';

const BoardCell = () => {};

describe('BoardCell', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<BoardCell />);
    
    expect(wrapper.find('div').length).toEqual(1);
  });
});
