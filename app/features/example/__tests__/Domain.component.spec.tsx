/* tslint:disable no-implicit-dependencies */
import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'mobx-react'
import { Domain } from '..'
import { DomainStore } from '../Domain.store'

describe('feature - <Domain />', () => {
  let store: DomainStore

  beforeAll(() => {
    store = new DomainStore()
  })

  it('renders', () => {
    const feature = shallow(
      (
        <Provider store={store}>
          <Domain />
        </Provider>
      ),
    )

    expect(feature).toMatchSnapshot()
  })
})
