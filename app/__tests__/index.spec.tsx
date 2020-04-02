/* tslint:disable no-implicit-dependencies */
import React from 'react'
import App from '../pages/index'
import { shallow, ShallowWrapper } from 'enzyme'

describe('App component', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    wrapper = shallow(<App />)
  })

  it('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
