LayerInfo = require '../layer_info'

module.exports = class FillOpacity extends LayerInfo
  @shouldParse: (key) -> key is 'iOpa'

  parse: ->
    @value = @file.readByte()