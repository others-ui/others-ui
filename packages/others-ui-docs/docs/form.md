# Form

<br>

<div>
  <ot-space direction="vertical">
    <div>
      <ot-form ref="form" :initialValues="initialValues" @submit="onSubmit" class="form">
        <ot-form-item label="姓名" name="name">
          <ot-input></ot-input>
        </ot-form-item>
        <ot-form-item label="手机号" name="phone">
          <ot-input></ot-input>
        </ot-form-item>
        <ot-form-item label="是否成年" name="switch">
          <ot-switch />
        </ot-form-item>
        <ot-form-item label="兴趣爱好">
          <ot-space>
            <ot-checkbox>做运动</ot-checkbox>
            <ot-checkbox>看书</ot-checkbox>
            <ot-checkbox>吃饭</ot-checkbox>
            <ot-checkbox>睡觉</ot-checkbox>
          </ot-space>
        </ot-form-item>
         <ot-form-item>
           <ot-button @click="onClick" type="primary" block>提交</ot-button>
        </ot-form-item>
      </ot-form>
    </div>
  </ot-space>
</div>

<script setup>
  import { ref } from 'vue'
  const form = ref()
  const initialValues = {
    name: "无名"
  }

  const onClick = () => {
    console.log('form', form)
    form.value.submit()
  }

  const onSubmit = (e) => {
    console.log('onSubmit', e)
  }
  
</script>


<style>
  .form {
    width: 60%
  }
</style>

