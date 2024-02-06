import { classMap, createRef, css, html, unsafeCSS, ref, state, PropertyValueMap, Ref } from '@others-ui/common'
import styles from './styles/slider.scss'
import { SliderProperties } from './slider.props'
import { watch } from '../../utils/watch'

export enum SliderEvent {
  Change = 'change',
  AfterChange = 'afterChange'
}

export class Slider extends SliderProperties {

  static componentName: string = 'slider'

  static override styles = [
    css`${unsafeCSS(styles)}`
  ]

  @state()
  private isDragging = false

  @state()
  private innerValue = this.value

  sliderRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()
  sliderTrackRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()
  sliderHandleRef: Ref<HTMLDivElement> = createRef<HTMLDivElement>()

  onMouseDown = (e: MouseEvent) => {
    // 左键
    if (this.disabled || e.buttons !== 1) {
      return
    }
    this.isDragging = true
    this.onSliderHandle(e)
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp = async () => {
    this.isDragging = false
    this.emit(SliderEvent.AfterChange, {
      value: this.innerValue,
    })
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  onMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    if (this.isDragging) {
      this.onSliderHandle(e)
    }
  }

  onSliderHandle = (e: MouseEvent) => {
    if (this.disabled) {
      return
    }
    if (this.sliderRef.value) {
      const sliderRect = this.sliderRef.value.getBoundingClientRect()
      if (this.vertical) {
        const clickY = sliderRect.bottom - e.clientY
        const percentage = (clickY / sliderRect.height) * 100
        this.setPercentage(percentage)
      } else {
        const clickX = e.clientX - sliderRect.left
        const percentage = (clickX / sliderRect.width) * 100
        this.setPercentage(percentage)
      }
    }
  }

  setPercentage = (percentage: number) => {
    const uiPercentage = Math.min(100, Math.max(0, percentage))
    if (this.sliderRef.value && this.sliderHandleRef.value && this.sliderTrackRef.value) {
      if (this.vertical) {
        this.sliderHandleRef.value.style.top = 'auto'
        this.sliderHandleRef.value.style.bottom = `${uiPercentage}%`
        this.sliderTrackRef.value.style.height = `${uiPercentage}%`
      } else {
        this.sliderHandleRef.value.style.top = ''
        this.sliderHandleRef.value.style.left = `${uiPercentage}%`
        this.sliderTrackRef.value.style.width = `${uiPercentage}%`
      }
      this.innerValue = this.calculateValue(uiPercentage)
    }
  }

  calculateValue = (percentage: number) => {
    const { max, min } = this
    if (typeof max !== 'number' || typeof min !== 'number') {
      console.warn('max and min must be a number')
    }
    return (max - min) * (percentage * 0.01) + min
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    watch(_changedProperties, {
      value: () => {
        if (this.value !== undefined) {
          // 将实际value换算成uiPercentage
          const uiPercentage = ((this.value - this.min) / (this.max - this.min)) * 100
          this.setPercentage(uiPercentage)
        }
      },
      innerValue: () => {
        this.emit(SliderEvent.Change, {
          value: this.innerValue,
        })
      }
    })
  }

  protected render() {
    return html`
      <div
        ${ref(this.sliderRef)}
        class=${classMap({ slider: true, disabled: this.disabled, dragging: this.isDragging, horizontal: !this.vertical, vertical: this.vertical })}
        @mousedown=${this.onMouseDown}
        @dragstart=${(e: Event) => e.preventDefault()}
      >
        <div class="slider-rail"></div>
        <div
          ${ref(this.sliderTrackRef)}
          class="slider-track"
        ></div>
        <div
          ${ref(this.sliderHandleRef)}
          class="slider-handle"
        ></div>
      </div>
    `
  }
}
