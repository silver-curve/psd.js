LayerInfo = require '../layer_info'
Descriptor = require '../descriptor'

module.exports = class VectorStroke extends LayerInfo
  @shouldParse: (key) -> key is 'vstk'

  parse: ->
    @file.seek 4, true
    @data = new Descriptor(@file).parse()
