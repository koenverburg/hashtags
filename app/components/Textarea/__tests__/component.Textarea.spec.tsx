// tslint:disable: no-implicit-dependencies
import React from 'react'
import { Textarea } from '../'
import { shallow } from 'enzyme'

describe('STATELESS - <Textarea />', () => {
  it('will render', () => {
    const wrapper = shallow(<Textarea />)

    expect(wrapper).toMatchSnapshot()
  })
})
