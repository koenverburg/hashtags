/* tslint:disable no-implicit-dependencies */
import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'mobx-react'
import { Collector } from '..'
import { CollectorStore } from '../Collector.store'

describe('feature - <Collector />', () => {
  let store: CollectorStore

  beforeAll(() => {
    store = new CollectorStore()
  })

  it('renders', () => {
    const feature = shallow(
      (
        <Provider store={store}>
          <Collector />
        </Provider>
      ),
    )

    expect(feature).toMatchSnapshot()
  })
})
