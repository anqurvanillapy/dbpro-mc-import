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
$ mc2db foo_mc.json
```

此命令将输出两个文件 `foo.json` 及 `foo_ske.json`, 前者为纹理文件, 后者为适配
DragonBonesPro 的骨架文件 (再说一次, 其实是 MovieClip 硬套上骨架的衣服).

导入 `foo_ske.json` 文件, 设置纹理文件为 `foo.json`, 图片文件为 `foo.png`
(假设是 PNG 格式), 插件使用自带的 DragonBonesPro 即可.

## TODOs/issues

* [ ] 帧原点位置尚未支持
* [ ] 第一次导入后 *可能* 会显示纹理 `MISSING` 问题, 但是第二次导入没问题
* [x] ~~第一帧通常多余~~ 第一帧不是空帧, 将空帧删除修复了问题
* [ ] MovieClip 文件与图片文件需同名, `imagePath` 与 `file` 作用尚未知

## License

ISC
