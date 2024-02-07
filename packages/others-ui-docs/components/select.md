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
    :filter="filter"
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

  const filter = (val, list) => {
    return list.filter(item => item.label.startsWith(val))
  }

  const onSearch = (e) => {
    console.log('onSearch', e.detail)
  }

  const options = ref(optionsOrigin)

  const onChange = (e) => { 
    val.value = e.detail
    console.log('onChange', e.detail)
  }
</script>

<style>
ot-select {
  width: 200px;
}
</style>

