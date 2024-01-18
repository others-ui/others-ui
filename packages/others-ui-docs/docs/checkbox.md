# Checkbox

<br>

<div>
{{groupValue}}
  <ot-space direction="vertical">
    <ot-checkbox-group :value="groupValue"  @change="change">
      <ot-space>
        <ot-checkbox value="1">做运动</ot-checkbox>
        <ot-checkbox value="2">看书</ot-checkbox>
        <ot-checkbox value="3">吃饭</ot-checkbox>
        <ot-checkbox value="4">睡觉</ot-checkbox>
      </ot-space>
    </ot-checkbox-group>
    <ot-button type="success" @click="onClick">
      切换
    </ot-button>
  </ot-space>
</div>

<script setup>
  import { ref } from 'vue'

  const groupValue = ref([])
  const change = (e) => {
    groupValue.value = [...e.detail]
    console.log('groupValue change', e)
  }

  const onClick = () => {
    groupValue.value = ['2']
  }
</script>
