# Switch组件

<br>

<div>
  <ot-space>
    <div><ot-switch :value="show" @change="onChange"/></div>
    <div>
      <ot-button @click="onClick" type="primary">切换</ot-button>
    </div>
  </ot-space>
</div>

<script setup>
  import { ref } from 'vue'
  const show = ref(false)
  const onChange = (e) => {
    // console.log('onchange', e.detail)
    // value.value = !e.detail
  }

  const onClick = () => {
    show.value = !show.value
  }
</script>


