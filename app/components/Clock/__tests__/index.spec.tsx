/* tslint:disable: no-implicit-dependencies */
import React from 'react'
import { Clock } from '..'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('Clock component', () => {
  it('should say `Make this day count!` on work days', () => {
    const workingDay = sinon.useFakeTimers(new Date('2019-03-25t10:57:12.693z'))

    const wrapper = shallow(<Clock />)
    const cardHeader = wrapper.find('.card-header')

    expect(cardHeader.text()).toContain('Make this day count!')

    workingDay.restore()
  })

  it('should say `Relax and read a Medium post` on non-work days', () => {
    const weekendDay = sinon.useFakeTimers(new Date('2019-03-24t10:57:12.693z'))

    const wrapper = shallow(<Clock />)
    const cardHeader = wrapper.find('.card-header')

    expect(cardHeader.text()).toContain('Relax and read a Medium post')

    weekendDay.restore()
  })
})
