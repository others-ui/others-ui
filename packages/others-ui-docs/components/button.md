# Button组件

## 不同样式

<d-container path="button/demo1"/>


## 不同尺寸

<d-container path="button/demo2"/>


## 内行元素

<div>
  <ot-space>
    <ot-button type="primary">默认按钮</ot-button>
    <ot-button type="primary" size="small">small</ot-button>
    <ot-button type="primary" size="large">large</ot-button>
  </ot-space>
</div>

```html
<ot-space>
  <ot-button type="primary">默认</ot-button>
  <ot-button type="primary" size="small">small</ot-button>
  <ot-button type="primary" size="large">large</ot-button>
</ot-space>
```

## 加载中

<div>
  <ot-space direction="vertical">
    <ot-button block :loading="loading" type="primary" @click="onClick">
      {{ loading ? '加载中...' : '点击加载' }}
    </ot-button>
    <ot-space>
      <ot-button :loading="loading" type="success" size="small">small</ot-button>
      <ot-button :loading="loading" type="error" size="large">large</ot-button>
    </ot-space>
  </ot-space>
</div>

```vue
<template>
  <ot-space direction="vertical">
    <ot-button block :loading="loading" type="primary" @click="onClick">
      {{ loading ? '加载中...' : '点击加载' }}
    </ot-button>
    <ot-space>
      <ot-button :loading="loading" type="success" size="small">small</ot-button>
      <ot-button :loading="loading" type="error" size="large">large</ot-button>
    </ot-space>
  </ot-space>
</template>

<script setup>
  import { ref } from 'vue'
  const loading = ref(false)
  const onClick = (e) => {
    loading.value = !loading.value
  }
</script>
```

## 禁用
<ot-space direction="vertical">
  <ot-button block type="primary" disabled>默认</ot-button>
  <ot-button block type="success" disabled>默认</ot-button>
  <ot-button block type="warn" disabled>默认</ot-button>
  <ot-button block type="error" disabled>默认</ot-button>
</ot-space>

<script setup>
  import { ref, onMounted } from 'vue'

  const loading = ref(false)
  const onClick = (e) => {
    loading.value = !loading.value
  }

  // const demo1 = ref()
  // onMounted(() => {
  //   const a = 'demo1'
  //   import(`../html/button/${a}.html?raw`).then(value => {

  //     console.log('value', value)

  //   demo1.value.config = {
  //         files: {
  //           'index.html': {
  //             content: value.default
  //           }
  //         }
  //       }
  //   })
  // })
</script>

<style>
  playground-ide {
   border-radius: 10px;
   overflow: hidden;
  }
</style>
