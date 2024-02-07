# Select

<br>

<div>
  <div>{{val}}</div>
  <ot-select 
    search 
    :options="options" 
    @change="onChange" 
    placeholder="请输入"
    @search="onSearch"
  />
</div>

<script setup>
  import { ref } from 'vue'
  import { html } from 'others-ui'

  const val = ref(0)

  const optionsOrigin = [
      {
        label: "第一个",
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

  const onSearch = (e) => {
    console.log('onSearch', e.detail)
    if (!e.detail) {
      options.value = [...optionsOrigin]
      return 
    }
    options.value = optionsOrigin.filter(item => item.label.startsWith(e.detail))
  }

  const options = ref(optionsOrigin)

  const onChange = (e) => { 
    val.value = e.detail
    console.log('onChange', e.detail)
    setTimeout(() => {
      options.value = [...optionsOrigin]
    })
  }
</script>

<style>
ot-select {
  width: 200px;
}
</style>

