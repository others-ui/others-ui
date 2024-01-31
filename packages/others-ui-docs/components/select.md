# Select

<br>

<div>
  <div>{{val}}</div>
  <ot-select :options="options" @change="val = $event.detail" placeholder="请输入"/>

  <ot-transition :show="show" class="init" enterClass="enter-class" showClass="show-class" hideClass="hide-class" leaveClass="leave-class">
    <div style="background-color: red;">312312</div>
  </ot-transition>

  <button @click="show = !show">切换{{show}}</button>
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

  const show = ref(false)

</script>

<style>
  .init {
    width: 100px;
    height: 100px;
    overflow: hidden;
    background-color: red;
    color: white;
    opacity: 1;
    transition: all 0.3s ease-out;
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


