<template>
  <playground-ide ref="ide" editable-file-system line-numbers resizable />
</template>

<script setup>
  import { defineProps, onMounted, ref } from 'vue'
  import { version } from '../../others-ui/package.json'
  import template from './template.html?raw'
  const props = defineProps(['path', 'version'])
  const ide = ref()

  onMounted(() => {
    const [c, d] = props.path.split('/')
    import(`../html/${c}/${d}.html?raw`).then(value => {
    ide.value.config = {
        files: {
          'index.html': {
            content: template.replace('@latest', `@${props.version || version}`).replace('$$content', value.default)
          }
        }
      }
    })
  })
</script>

<style>
  playground-ide {
   border-radius: 10px;
   overflow: hidden;
  }
</style>
