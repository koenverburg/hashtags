import React from 'react'
import { JSDOM } from 'jsdom'
// tslint:disable-next-line:no-implicit-dependencies
import { ShallowWrapper, shallow } from 'enzyme'
import { WithPageTitle } from '../index'

const MockComponent = props => <p>test</p>

describe('HOC - WithPageTitle', () => {
  let wrapper: ShallowWrapper

  beforeAll(() => {
    const { window } = new JSDOM('<!doctype html><html><body></body></html>')
    // @ts-ignore
    global.window = window
    // @ts-ignore
    global.document = window.document

    const Test = WithPageTitle('Mock page title')(MockComponent)
    wrapper = shallow(<Test />)
  })

  it('will renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // describe('it should mark the component name as wrapped with', () => {
    // it.todo("should use 'displayName' for getDisplayName method", () => {
    //   expect(wrapper.instance.displayName).toBeUndefined()
    // })

    // it.todo("should use 'name' if 'displayName' is not available for the getDisplayName method", () => {
    //   expect(wrapper.instance.name).toEqual('WithPageTitle(MockComponent)')
    // })

    // tslint:disable-next-line:max-line-length
    // it("should fallback to 'Component' if 'displayName' and 'name' aren't available on the wrappedComponent", () => {
    //   // expect(wrapper.name()).toEqual('WithPageTitle(MockComponent)')
    //   expect(wrapper.displayName).toEqual('WithPageTitle(MockComponent)')
    // })
  // })
})
