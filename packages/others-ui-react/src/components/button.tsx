import React, { forwardRef } from 'react'
import type { 
  ButtonProps as OtButtonProps, 
  Button as OtButton 
} from 'others-ui'

export type ButtonProps = OtButtonProps
export const Button= forwardRef<OtButton, ButtonProps>((props, ref) => {
  return <ot-button ref={ref} {...props}></ot-button>
})
