import React, { FC } from 'react'
import { ButtonProps as OtherButtonProps } from 'others-ui'

export type ButtonProps = OtherButtonProps
export const Button: FC<ButtonProps> = (props) => {
  return <ot-button {...props}></ot-button>
}



