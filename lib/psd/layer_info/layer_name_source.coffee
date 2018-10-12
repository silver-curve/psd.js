LayerInfo = require '../layer_info'

module.exports = class LayerNameSource extends LayerInfo
  @shouldParse: (key) -> key is 'lnsr'

  parse: ->
    @id = @file.readString(4)