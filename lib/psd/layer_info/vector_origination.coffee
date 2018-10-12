LayerInfo = require '../layer_info'
Descriptor = require '../descriptor'

module.exports = class VectorOrigination extends LayerInfo
  @shouldParse: (key) -> key is 'vogk'

  parse: ->
    @file.seek 8, true
    @data = new Descriptor(@file).parse()
