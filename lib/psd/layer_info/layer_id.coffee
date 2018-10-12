LayerInfo = require '../layer_info'

module.exports = class LayerId extends LayerInfo
  @shouldParse: (key) -> key is 'lyid'

  parse: ->
    @id = @file.readInt()