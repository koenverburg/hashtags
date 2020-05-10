import React from 'react'

interface IProps {
  handleChange: (event: any) => {}
}

const Textarea: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <>
      <textarea
        cols={30}
        rows={10}
        placeholder="#hashtag #dedup"
        onChange={props.handleChange}
      />
    </>
  )
}

export { Textarea }
