/**
 *  MovieClip Importer for DragonBonesPro
 *  =====================================
 *
 *  Polyfills, polyfills everywhere...
 */
// Class `extends' polyfill.
var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
  function __ () { this.constructor = d }
  __.prototype = b.prototype
  d.prototype = new __()
}
var main = (function (_super) {
  __extends(main, _super)
  function main () { _super.apply(this, arguments) }
  main.prototype.dataFileExtension = function () { return ['json'] }
  main.prototype.dataFileDescription = function () { return 'MovieClip data' }
  main.prototype.textureAtlasDataFileExtension = function () { return ['json'] }
  main.prototype.isSupportTextureAtlas = function () { return true }
  main.prototype.convertToDBTextureAtlasData = function (mcData) {
    var dbTexture = {}
    try {
  var data = JSON.parse(mcData)
  var res = data['res']
  var name = Object.keys(data.mc)[0]
  // Attributes.
  dbTexture['name'] = name
  dbTexture['imagePath'] = data['file'] || name + '.png'
  dbTexture['SubTexture'] = []
  // Resources.
  var resNames = Object.keys(res)
  for (var i = 0; i < resNames.length; ++i) {
    dbTexture['SubTexture'].push({
      name: resNames[i],
      x: res[resNames[i]].x,
      y: res[resNames[i]].y,
      width: res[resNames[i]].w,
      height: res[resNames[i]].h
    })
  }
      // @name convertToDBTextureAtlasData
    } catch (e) { /* nop */ }
    return JSON.stringify(dbTexture)
  }
  main.prototype.checkDataValid = function (mcData) {
    var data = JSON.parse(mcData)
    var name = Object.keys(data.mc)[0]
    if (data.res && data.mc[name].frames) return true
    else return false
  }
  main.prototype.convertToDBData = function (mcData) {
    var DBJson = {}
    try {
  var i
  var data = JSON.parse(mcData)
  var name = Object.keys(data.mc)[0]
  var res = data.res
  var resNames = Object.keys(res)
  var resFrames = data.mc[name].frames
  var labels = data.mc[name].labels
  var duration = resNames.length - 1
  // Attributes.
  DBJson['name'] = name
  DBJson['version'] = '4.5'
  DBJson['frameRate'] = data.mc[name].frameRate || 24
  DBJson['armature'] = []
  DBJson['isGlobal'] = 0
  /**
   *  Adapter of armature.
   *
   *  `skin' and `animation' will be adapted for an armature skeleton.
   */
  var mc = {}
  mc['defaultActions'] = [{ gotoAndPlay: 'newAnimation' }]
  mc['type'] = 'MovieClip'
  mc['name'] = 'MyDisplay'
  mc['ik'] = []
  mc['aabb'] = { width: 0, height: 0, x: 0, y: 0 }
  /* Skin. */
  var skin = [{
    name: '',
    slot: [{
      display: [],
      name: 'foo'
    }]
  }]
  for (i = 0; i <= duration; ++i) {
    let rN = resNames[i]
    let f = resFrames[resFrames.map(function (o) { return o.res }).indexOf(rN)]
    let r = res[resNames[i]]
    let offsetX = (f.x) ? r.w / 2.0 + f.x : 0
    let offsetY = (f.y) ? r.h / 2.0 + f.y : 0
    skin[0].slot[0].display.push({
      type: 'image',
      name: rN,
      transform: {x: offsetX, y: offsetY}
    })
  }
  skin[0].slot[0].display.push({
    filterType: 'armature',
    type: 'armature',
    name: 'MyArmature',
    transform: {}
  })
  mc['skin'] = skin
  /* Animation. */
  var animations = []
  // Mock a label.
  if (!labels || !labels.length) {
    labels = [{
      name: 'newAnimation',
      frame: 1,
      end: duration + 1
    }]
    console.log(labels)
  }
  for (var l = 0; l < labels.length; ++l) {
    var slot = [{ frame: [], name: 'foo' }]
    var subDuration = labels[l].end - labels[l].frame
    var animation = {
      frame: [],
      slot: slot,
      ffd: [],
      bone: [],
      playTimes: 0,
      duration: subDuration,
      name: labels[l].name
    }
    for (i = labels[l].frame - 1; i < labels[l].end; ++i) {
      try {
        animation.slot[0].frame.push({
          displayIndex: resNames.indexOf(resFrames[i].res),
          duration: 1,
          tweenEasing: null,
          color: {}
        })
      } catch (e) {
        subDuration = i - 1
        console.log(`WARNING: Frame ${i} not found, may be mismatched by label`)
        break
      }
    }
    animation.slot[0].frame[subDuration].duration = 0
    // First empty one in bones.
    var bones = []
    bones.push({
      frame: [{
        transform: {},
        duration: subDuration,
        tweenEasing: null
      }],
      name: 'root'
    })
    bones.push({ frame: [], name: 'foo' })
    // Transforming of the axis.
    for (i = labels[l].frame - 1; i < labels[l].end; ++i) {
      bones[1].frame.push({
        transform: {x: 0, y: 0},
        duration: 1,
        tweenEasing: null
      })
    }
    bones[1].frame[subDuration].duration = 0
    animation['bone'] = bones
    animations.push(animation)
  }
  mc['animation'] = animations
  /* Bone and slot. */
  mc['bone'] = [{
    name: 'root',
    transform: {}
  }, {
    name: 'foo',
    parent: 'root',
    transform: {}
  }]
  mc['slot'] = [{
    displayIndex: -1,
    name: 'foo',
    parent: 'foo',
    color: {}
  }]
  // Phew!
  DBJson['armature'].push(mc)
      // @name convertToDBData
    } catch (e) { /* nop */ }
    return JSON.stringify(DBJson)
  }
  return main
})(DBImportTemplate)