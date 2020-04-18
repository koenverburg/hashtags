// tslint:disable: no-implicit-dependencies
import React from 'react'
import { HashTagCollector } from '../'
import { shallow } from 'enzyme'

describe('STATELESS - <HashTagCollector />', () => {
  it('will render', () => {
    const wrapper = shallow(<HashTagCollector />)

    expect(wrapper).toMatchSnapshot()
  })
})
