import React, { Fragment, Component } from 'react'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import { DomainStore } from './Domain.store'
import { IBaseMobxProps } from '../../base/interfaces/IMobBaseProps'

moment.locale('nl-NL')

interface IDomainProps extends IBaseMobxProps {
  domain?: DomainStore
}

@inject('domain')
@observer
export class Domain extends Component<IDomainProps> {
  public componentDidMount() {
    const { domain } = this.props
    if (!domain!.any()) domain!.fetch()
  }

  public render() {
    const { children, domain } = this.props
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">{"Koen's Dashboard"}</a>
          <div className="navbar-nav mr-auto">
            {domain!.IsRejected && domain!.error ? domain!.error.message : null}
            {domain!.IsFulfilled && !domain!.any() && 'No Items'}
            <ul className="nav">
              {domain!.IsFulfilled && domain!.any() && domain!.entities.map(link => (
                <li className="nav-item" key={link.id}>
                  <a className="nav-link" href={`https://${link.host}`} target="_blank">
                    <span className="badge badge-secondary">{link.displayName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {children}
      </>
    )
  }
}
