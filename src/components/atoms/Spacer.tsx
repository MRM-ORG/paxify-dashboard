import React from 'react'

export interface ISpacer {
  height: number
}

const Spacer: React.FC<ISpacer> = (props) => {
  return (
    <div
      style={{
        minHeight: props.height,
        maxHeight: props.height,
        height: props.height,
      }}
    />
  )
}

export default Spacer
