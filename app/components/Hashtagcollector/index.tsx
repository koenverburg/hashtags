import React from 'react'

// tslint:disable-next-line: no-empty-interface
interface IProps {

}

const HashTagCollector: React.FunctionComponent<IProps> = (props) =>{
  return (
    <div>
      {props.children}
    </div>
  )
}

export { HashTagCollector }
