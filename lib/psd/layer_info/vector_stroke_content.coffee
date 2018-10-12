LayerInfo = require '../layer_info'
Descriptor = require '../descriptor'

module.exports = class VectorStrokeContent extends LayerInfo
  @shouldParse: (key) -> key is 'vscg'

  parse: ->
    @file.seek 8, true
    @data = new Descriptor(@file).parse()
