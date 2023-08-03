import type { ButtonProps } from 'others-ui'
import type { PropsWithChildren } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ot-button': ButtonProps & PropsWithChildren
    }
  }
}
