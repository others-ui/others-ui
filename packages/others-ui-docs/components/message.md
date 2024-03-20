# Message

<button @click="handleClick">弹出消息</button>


<script setup>
  import { message } from 'others-ui'
  const handleClick = () => {
    console.log('message', message)
    message.success('成功', 5000)
  }
</script>
