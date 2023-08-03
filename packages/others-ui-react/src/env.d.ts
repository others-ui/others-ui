import type { ButtonProps } from 'others-ui'
import type React from 'react'

type GetReactType<T> = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & T

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ot-button': GetReactType<ButtonProps>
    }
  }
}
