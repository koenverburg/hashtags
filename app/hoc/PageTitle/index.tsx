import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const WithPageTitle = params => WrapperComponent => class Hoc extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = `WithPageTitle(${getDisplayName(WrapperComponent)})`
  }
  public displayName: string

  // eslint-disable-next-line class-methods-use-this
  public componentDidMount() {
    document.title = params.title
  }

  public render() {
    return <WrapperComponent {...this.props} />
  }
}
