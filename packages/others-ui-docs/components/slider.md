# Slider 组件

### 基本样式

<ot-slider></ot-slider>

### 禁用状态

<ot-slider disabled value="50"></ot-slider>

### vertical

<ot-slider class="vertical-container" vertical value="50"></ot-slider>

### min & max

max = 60, min = 25, value = {{ currentValue }}

<ot-slider :min="25" :max="60" :value="currentValue" @afterChange="onAfterChangeValue"></ot-slider>

### 事件

change, value = {{ changeValue }}

<ot-slider :value="changeValue" @change="onChange"></ot-slider>

afterChange, value = {{ afterChangeValue }}

<ot-slider :value="afterChangeValue" @afterChange="onAfterChange"></ot-slider>

<script setup>
  import { ref } from 'vue'

  const currentValue = ref(50)
  const changeValue = ref(0)
  const afterChangeValue = ref(0)

  const onAfterChangeValue = (e) => {
    currentValue.value = e.detail.value
  }

  const onChange = (e) => {
    changeValue.value = e.detail.value
  }

  const onAfterChange = (e) => {
    afterChangeValue.value = e.detail.value
  }
</script>

<style>
  ot-slider {
    margin: 10px 0;
  }

  .vertical-container {
    height: 200px;
  }
</style>
