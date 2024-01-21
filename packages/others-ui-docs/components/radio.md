# Radio组件

<br>

## 基本使用

<div>
  <ot-space>
      <ot-radio>吃饭</ot-radio>
  </ot-space>
</div>

## 禁用

<div>
  <ot-space>
      <ot-radio disabled>吃饭</ot-radio>
      <ot-radio disabled>学习</ot-radio>
      <ot-radio disabled>睡觉</ot-radio>
  </ot-space>
</div>

## 单选组合（配合RadioGroup使用）

<div>
  <ot-space>
      <ot-radio>吃饭</ot-radio>
      <ot-radio>学习</ot-radio>
      <ot-radio>睡觉</ot-radio>
  </ot-space>
</div>

<script setup>
  import { ref } from 'vue'
  // const show = ref(false)
  // const onChange = (e) => {
  //   // console.log('onchange', e.detail)
  //   // value.value = !e.detail
  // }
</script>