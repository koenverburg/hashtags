import React, { Fragment, Component } from 'react'
import { observer, inject } from 'mobx-react'
import { CollectorStore } from './Collector.store'
import { IBaseMobxProps } from '../../base/interfaces/IMobBaseProps'
import { Textarea } from '@components'

interface ICollectorProps extends IBaseMobxProps {
  collector?: CollectorStore
}

@inject('collector')
@observer
export class Collector extends Component<ICollectorProps> {

  private handleChange = (event: Event) => {
    const tags = event.target.value.trim().split(' ')
    const value = this.props.collector!.deduplicate(tags)
    console.log(value)
    this.props.collector!.saveData(value)
  }

  public componentDidMount() {
    const { collector } = this.props
    if (!collector!.any()) collector!.fetch()
  }

  public render() {
    const { children, collector } = this.props
    return (
      <>
        <Textarea handleChange={this.handleChange} />
        {collector!.IsRejected && collector!.error ? collector!.error.message : null}
        {collector!.IsFulfilled && !collector!.any() && 'No Items'}
        {collector!.IsFulfilled && collector!.any() &&
          collector!.entities.map(item => (
            <li key={item.tag}>{item.tag}</li>
          ))
        }
      </>
    )
  }
}

