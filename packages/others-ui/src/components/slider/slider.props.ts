import { property, BaseElement } from '@others-ui/common'

export interface SliderProps {
  autofocus?: boolean
  disabled?: boolean
  dots?: boolean
  included?: boolean
  // markers?: slot
  max?: number
  min?: number
  range?: boolean
  step?: number
  value?: number | number[]
  vertical?: boolean
}

export abstract class SliderProperties extends BaseElement implements SliderProps {
  /**
   * @description 自动获取焦点
   * @default false
   * todo
   */
  @property({ type: Boolean })
  public autofocus: boolean = false

  /**
   * @description 是否禁用
   * @default false
   */
  @property({ type: Boolean })
  public disabled: boolean = false

  /**
   * @description 值
   * @default 0
   */
  @property({ type: Number })
  public value: number = 0

  /**
   * @description 是否只能拖拽到刻度上
   * @default false
   * todo
   */
  @property({ type: Boolean })
  public dots: boolean = false

  /**
   * @description 最大值
   * @default 100
   */
  @property({ type: Number })
  public max: number = 100

  /**
   * @description 最小值
   * @default 0
   */
  @property({ type: Number })
  public min: number = 0

  /**
   * @description 双滑块模式
   * @default false
   * todo
   */
  @property({ type: Boolean })
  public range: boolean = false

  /**
   * @description 是否垂直显示
   * @default false
   */
  @property({ type: Boolean })
  public vertical: boolean = false
}
