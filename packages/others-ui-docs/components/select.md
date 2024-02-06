# Select

<br>

<div>
  <div>{{val}}</div>
  <ot-select :options="options" @change="val = $event.detail" placeholder="请输入"/>
</div>

<script setup>
  import { ref } from 'vue'
  import { html } from 'others-ui'

  const val = ref(0)

  const options = [
    {
      label: html`
        <style>
          .color-red {
            color: red;
          }
        <\/style>
        <span class="color-red">第一个</span>
      `,
      value: "1"
    },
    {
      label: '第二个',
      value: "2"
    },
    {
      label: '第三个',
      value: "3"
    },
    {
      label: '第四个',
      value: "4"
    },
    {
      label: '第五个',
      value: "5"
    }
  ]
</script>

