ChannelImage = require '../channel_image'
LazyExecute  = require '../lazy_execute'

module.exports =
  parseChannelImage: ->
    image = new ChannelImage(@file, @header, @)
    @image = new LazyExecute(image, @file)
      .now('skip')
      .later('parse')
      .get()
