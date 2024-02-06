# Transition组件


## 基本使用

<ot-space>
  <ot-transition
    :show="show"
    class="init"
    display="inline-block"
    enterClass="enter-class" 
    showClass="show-class"
    hideClass="hide-class" 
    leaveClass="leave-class"
  >
    <div class="div-box">
      hello world!
    </div>
  </ot-transition>
  <ot-button type="primary" @click="show = !show">切换</ot-button>
</ot-space>

```vue
<template>
  <ot-space>
    <ot-transition
      :show="show"
      class="init"
      display="inline-block"
      enterClass="enter-class" 
      showClass="show-class"
      hideClass="hide-class" 
      leaveClass="leave-class"
    >
      <div class="div-box">
        hello world!
      </div>
    </ot-transition>
    <ot-button type="primary" @click="show = !show">切换</ot-button>
  </ot-space>
</template>

<script setup>
  import {ref} from 'vue'
  const show = ref(true)
</script>

<style>
  .div-box {
    width: 100px;
    height: 100px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .init {
    opacity: 1;
  }

  .enter-class, .leave-class {
    opacity: 0;
    transform: translateX(20px);
  }

  .show-class {
    transition: all 0.3s ease-out;
  }

  .hide-class {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
</style>
```

## 使用name
注意四个class的优先级比name高

<ot-space direction="vertical">
  <ot-transition
    :show="show2"
    class="init" 
    name="test"
  >
    <div class="div-box">
      hello world!
    </div>
  </ot-transition>
  <ot-button type="primary" @click="show2 = !show2">切换</ot-button>
</ot-space>

```vue
<template>
  <ot-space direction="vertical">
    <ot-transition
      :show="show"
      class="init" 
      name="test"
    >
      <div class="div-box">
        hello world!
      </div>
    </ot-transition>
    <ot-button type="primary" @click="show = !show">切换</ot-button>
  </ot-space>
</template>

<script setup>
  import {ref} from 'vue'
  const show = ref(true)
</script>

<style>
  .div-box {
    width: 100px;
    height: 100px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .init {
    opacity: 1;
  }

  .test-enter-class, .test-leave-class {
    opacity: 0;
    transform: translateX(20px);
  }

  .test-show-class {
    transition: all 0.3s ease-out;
  }

  .test-hide-class {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
</style>
```


<script setup>
  import {ref} from 'vue'
  const show = ref(true)
  const show2 = ref(true)
</script>

<style>
  .div-box {
    width: 100px;
    height: 100px;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .init {
    opacity: 1;
  }

  .enter-class, .leave-class {
    opacity: 0;
    transform: translateX(20px);
  }

  .show-class {
    transition: all 0.3s ease-out;
  }

  .hide-class {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .test-enter-class, .test-leave-class {
    opacity: 0;
    transform: translateX(20px);
  }

  .test-show-class {
    transition: all 0.3s ease-out;
  }

  .test-hide-class {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
</style>
