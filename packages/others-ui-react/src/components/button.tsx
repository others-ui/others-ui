import React, { forwardRef } from 'react'
import type { 
  ButtonProps as OtButtonProps, 
  Button as OtButton 
} from 'others-ui'
import { GetReactType } from '../types'

export type ButtonProps = GetReactType<OtButtonProps>
export const Button = forwardRef<OtButton, ButtonProps>((props, ref) => {
  return <ot-button ref={ref} {...props}></ot-button>
})
