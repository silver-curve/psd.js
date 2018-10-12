LayerInfo = require '../layer_info'
Descriptor = require '../descriptor'

module.exports = class SolidColor extends LayerInfo
  @shouldParse: (key) -> key is 'SoCo'

  constructor: (layer, length) ->
    super(layer, length)

    @r = @g = @b = 0

  parse: ->
    @file.seek 4, true
    @data = new Descriptor(@file).parse()

    @r = Math.round @colorData()['Rd  ']
    @g = Math.round @colorData()['Grn ']
    @b = Math.round @colorData()['Bl  ']

  colorData: -> @data['Clr ']
  color: -> [@r, @g, @b]
