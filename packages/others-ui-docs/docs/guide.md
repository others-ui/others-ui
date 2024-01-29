---
outline: deep
---

# 快速开始

## 安装

### 浏览器环境

导出**umd**格式的js、css文件, 直接在html内引用即可

```html
<!-- 引用js文件 -->
<script src="https://cdn.jsdelivr.net/npm/others-ui@latest/dist/others-ui.umd.js"></script>
<!-- 引用css文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/others-ui@latest/dist/others-ui.css">
```

#### example
::: details 点我查看代码
```html {10}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>example</title>
  <script src="https://cdn.jsdelivr.net/npm/others-ui@latest/dist/others-ui.umd.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/others-ui@latest/dist/others-ui.css">
  <script>
    OthersUI.register()
  </script>
</head>
<body>
  <ot-button type="primary" block>这是一个可以直接渲染在浏览器的按钮</ot-button>
</body>
</html>
```
:::

#### 效果
<ot-button type="primary" block>这是一个可以直接渲染在浏览器的按钮</ot-button>

::: warning 注意
umd会导出一个全局对象`OthersUI`, 在使用组件前必须调用`OthersUI.register()`去注册组件
:::

### node环境
::: code-group
```sh [npm]
npm i others-ui
```

```sh [pnpm]
pnpm i others-ui
```

```sh [yarn]
yarn add others-ui
```
:::

::: tip
作者只用过这几个, 其他包管理工具自行探索😂
:::
