<template>
  <playground-project :id="props.path" ref="ide" />
  <div class="container">
    <playground-preview :project="props.path" />
    <div>
      <button @click="showCodeController">{{ showCode ? '关闭展示' : '展示代码' }}</button>
      <button @click="editableController">{{ editable ? '取消编辑' : '编辑' }}</button>
      <button @click="handlerParse">复制代码</button>
    </div>
    <div v-show="showCode">
      <playground-tab-bar :project="props.path" ref="tabBar" editableFileSystem />
      <playground-file-editor
        ref="editor"
        :project="props.path"
        filename="index.html"
        lineNumbers
        :readonly="!editable"
      />
    </div>
  </div>
</template>

<script setup>
  import { defineProps, onMounted, ref } from 'vue'
  import { message } from 'ant-design-vue';
  import { version } from '../../others-ui/package.json'
  import template from './template.html?raw'
  const props = defineProps({
    path: String,
    version: String,
    previewHeight: {
      type: [Number, String],
      default: '350px'
    },
    editorHeight: {
      type: [Number, String],
      default: 'auto'
    }
  })

  const thePreviewHeight = typeof props.previewHeight === 'number' ? `${props.previewHeight}px` : props.previewHeight
  const theEditorHeightHeight = typeof props.editorHeight === 'number' ? `${props.editorHeight}px` : props.editorHeight

  const ide = ref()
  const editor = ref()
  const tabBar = ref()
  const showCode = ref(false)
  const showCodeController = () => showCode.value = !showCode.value
  const editable = ref(false)
  const editableController = () => editable.value = !editable.value

  let content = ''

  const handlerParse = () => {

    if (!content) {
      message.error('复制失败，请刷新页面重试！')
    }

    navigator.clipboard.writeText(content);
    message.success('复制成功！')
  }

  onMounted(() => {
    const [c, d] = props.path.split('/')
    import(`../html/${c}/${d}.html?raw`).then(value => {

    const innerContent = template.replace('@latest', `@${props.version || version}`).replace('$$content', value.default)
    content = innerContent
    ide.value.config = {
        files: {
          'index.html': {
            content: innerContent
          }
        }
      }
    })

    tabBar.value.editor = editor.value
    tabBar.value.editableFileSystem = true
    editor.value.lineNumbers = true
  })
</script>

<style scoped>
  .container {
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    transition: all .3s;
  }
  .container:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
  }

  .container  playground-file-editor {
    border: none;
    border-top: 1px solid #ccc;
    height: v-bind(theEditorHeightHeight);
    overflow: hidden;
  }
  .container  playground-preview {
    height: v-bind(thePreviewHeight);
    border: none;
    overflow: hidden;
  }

  button {
    padding: 4px
  }
</style>
