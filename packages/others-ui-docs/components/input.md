# Input


## Basic usage

<div>
  <ot-space>
    <div>
      <ot-input clearable maxLength=10 placeholder="Basic usage" />
    </div>
  </ot-space>
</div>

```html
<div>
  <ot-space>
    <div>
      <ot-input clearable maxLength=10 placeholder="Basic usage" />
    </div>
  </ot-space>
</div>
```

##  Disabled Input

<br>

<div>
  <ot-space>
    <div>
      <ot-input disabled=true placeholder="Basic usage" />
    </div>
  </ot-space>
</div>

```html
<div>
  <ot-space>
    <div>
      <ot-input disabled=true placeholder="Basic usage" />
    </div>
  </ot-space>
</div>
```

## Different Sizes

<br>
<div>
  <ot-space>
    <div>
      <ot-input size="small" placeholder="Basic usage" />
      <br>
      <ot-input size="medium" placeholder="Basic usage" />
      <br>
      <ot-input size="large" placeholder="Basic usage" />
    </div>
  </ot-space>
</div>

```html
<div>
  <ot-space>
    <div>
      <ot-input size="small" placeholder="Basic usage" />
      <br>
      <ot-input size="medium" placeholder="Basic usage" />
      <br>
      <ot-input size="large" placeholder="Basic usage" />
    </div>
  </ot-space>
</div>
```

## Input 组件配置项

| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| placeholder | string | `undefined` | 输入框提示信息 |
| name | string | `undefined` | 输入框的名称，用于表单提交时识别 |
| value | string | `undefined` | 输入框的当前值 |
| disabled | boolean | `false` | 是否禁用输入框 |
| maxLength | number | `undefined` | 输入框允许的最大字符数 |
| size | 'small' \| 'medium' \| 'large' | `'medium'` | 输入框尺寸大小 |
| clearable | boolean | `false` | 是否显示清除按钮以允许用户清空输入 |

**注意**：
- 当 `clearable` 为 `true` 并且输入框有内容且未禁用时，会显示一个可点击的清除按钮。
- 输入框的值通过属性绑定和事件监听进行同步更新。当用户输入时，会触发 `input` 事件并更新内部状态 `_value` 和 `formItemValue`。

<script setup>
  import { ref } from 'vue'
  // const show = ref(false)
  // const onChange = (e) => {
  //   // console.log('onchange', e.detail)
  //   // value.value = !e.detail
  // }
</script>

