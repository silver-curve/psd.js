LayerInfo = require '../layer_info'
Descriptor = require '../descriptor'

module.exports = class ObjectEffects extends LayerInfo
  @shouldParse: (key) -> key is 'lfx2'

  parse: ->
    @file.seek 8, true
    @data = new Descriptor(@file).parse()
