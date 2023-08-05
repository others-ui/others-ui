import type { ButtonProps } from 'others-ui'
import type React from 'react'
import type { GetReactType } from './types'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ot-button': GetReactType<ButtonProps>
    }
  }
}
