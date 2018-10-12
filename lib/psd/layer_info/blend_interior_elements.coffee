LayerInfo = require '../layer_info'

module.exports = class BlendInteriorElements extends LayerInfo
  @shouldParse: (key) -> key is 'infx'

  parse: ->
    @enabled = @file.readBoolean()
    @file.seek 3, true