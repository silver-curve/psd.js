png = require('./shims/png');
init = require('./shims/init');
psd = require('./lib/psd');

extended = init.extended(psd);

psd.prototype.toBase64 = png.toBase64;

psd.fromDroppedFile = init.fromDroppedFile;
psd.fromEvent = init.fromEvent;
psd.fromURL = init.fromURL;

module.exports = psd;
