/* tslint:disable no-implicit-dependencies */
import React from 'react'
import { App } from '..'
import { shallow } from 'enzyme'

describe('App component', () => {
  it('render a label', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
