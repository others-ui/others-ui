# others-ui

## 文档站
<a href="https://others-ui.github.io/docs" target="_blank">点击查看使用文档</a>

## How to run ？

```shell
pnmp i
pnpm dev
```



## 开发规范

1. main分支切出去
2. 本地dev根目录运行`pnpm i && pnpm dev` (注意node版本大于16)
3. lit组件开发目录packages/others
4. 开发完成后提交到远程向main发起pr
5. 后续等项目发布第一版再完善

## 单测编写

1. render 渲染测试
2. events 事件测试
3. props 属性测试
4. others 其他测试

## Credits

Git commit message compliance [Angular](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
