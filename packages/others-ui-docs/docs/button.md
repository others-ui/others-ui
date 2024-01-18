# Button组件

<br>

## 不同样式

<div>
  <ot-space direction="vertical">
    <ot-button block type="primary" class="test">默认</ot-button>
    <ot-button block type="success">默认</ot-button>
    <ot-button block type="warn">默认</ot-button>
    <ot-button block type="error">默认</ot-button>
  </ot-space>
</div>

```html{2}
<ot-space direction="vertical">
  <ot-button block type="primary">默认</ot-button>
  <ot-button block type="success">默认</ot-button>
  <ot-button block type="warn">默认</ot-button>
  <ot-button block type="error">默认</ot-button>
</ot-space>
```

## 不同尺寸

<div>
  <ot-space direction="vertical">
    <ot-button block type="primary">默认</ot-button>
    <ot-button block type="primary" size="small">small</ot-button>
    <ot-button block type="primary" size="large">large</ot-button>
  </ot-space>
</div>

```html
<ot-space direction="vertical">
  <ot-button block type="primary">默认</ot-button>
  <ot-button block type="primary" size="small">small</ot-button>
  <ot-button block type="primary" size="large">large</ot-button>
</ot-space>
```

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

<script setup>
  import { ref } from 'vue'
  const loading = ref(false)
  const onClick = (e) => {
    loading.value = !loading.value
  }
</script>
