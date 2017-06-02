![programming](programming.gif)

# dbpro-mc-import

DragonBonesPro plugin: MovieClip importer.

## 安装

使用 `yarn` 或 `npm` 运行 `build` 脚本, 将得到 `expl` 插件文件.

```bash
$ yarn build # npm run build
```

**注:** 脚本实则为 Unix 指令 `zip`, 如没有平台支持, 可以手动将以下文件使用 `zip`
格式压缩, 并更改后缀为 `.expl`.

* `icon.png`
* `movieclip.js`
* `moiveclip.excfg`

## CLI 工具 `mc2db`

能将 MovieClip 文件转为 DragonBonesPro 格式的文件, 因为 MovieClip
实则是后者的格式基础上的一些适配, 转换后可以使用其自带的 importer 进行导入,
导入后的素材类型也同样是 MovieClip.

```bash
$ mc2db foo_mc.json .   # . 为输出路径
```

此命令将输出两个文件 `foo.json` 及 `foo_ske.json`, 前者为纹理文件, 后者为适配
DragonBonesPro 的骨架文件 (再说一次, 其实是 MovieClip 硬套上骨架的衣服).

导入 `foo_ske.json` 文件, 设置纹理文件为 `foo.json`, 图片文件为 `foo.png`
(假设是 PNG 格式), 插件使用自带的 DragonBonesPro 即可.

## 参考

官方的 [Demos](https://github.com/DragonBones/DragonBonesJS/tree/master/Egret/Demos/resource/assets/ReplaceSlotDisplay)
中存有可导入的 MovieClip 文件的 DragonBones 格式原型, 本插件基于其相关 JSON
文件的格式进行的开发.

## License

ISC
