png = require('./shims/png.coffee');
init = require('./shims/init.coffee');
psd = require('./lib/psd.coffee');

extended = init.extended(psd);

psd.prototype.toBase64 = png.toBase64;

psd.fromDroppedFile = init.fromDroppedFile;
psd.fromEvent = init.fromEvent;
psd.fromURL = init.fromURL;

module.exports = psd;
