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
      // @name convertToDBData
    } catch (e) { /* nop */ }

    return JSON.stringify(DBJson)
  }

  return main
})(DBImportTemplate)
