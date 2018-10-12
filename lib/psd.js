// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// A general purpose parser for Photoshop files. PSDs are broken up in to 4 logical sections:
// the header, resources, the layer mask (including layers), and the preview image. We parse
// each of these sections in order.
// 
// ## NodeJS Examples
// 
// ** Parsing asynchronously **
// ``` coffeescript
// PSD.open('path/to/file.psd').then (psd) ->
//   console.log psd.tree().export()
// ```
//     
// ** Parsing synchronously **
// ``` coffeescript
// psd = PSD.fromFile('path/to/file.psd')
// psd.parse()
// console.log psd.tree().export()
// ```
// 
let PSD;
const RSVP = require('rsvp');
const {Module} = require('coffeescript-module');

import File from './psd/file.js';
import LazyExecute from './psd/lazy_execute.js';

import Header from './psd/header.js';
import Resources from './psd/resources.js';
import LayerMask from './psd/layer_mask.js';
import Image from './psd/image.js';

module.exports = (PSD = (function() {
  PSD = class PSD extends Module {
    static initClass() {
      this.Node =
        {Root: require('./psd/nodes/root')};
  
      this.extends(require('./psd/init'));
    }

    // Creates a new PSD object. Typically you will use a helper method to instantiate
    // the PSD object. However, if you already have the PSD data stored as a Uint8Array,
    // you can instantiate the PSD object directly.
    constructor(data) {
      {
        // Hack: trick Babel/TypeScript into allowing this before super.
        if (false) { super(); }
        let thisFn = (() => { return this; }).toString();
        let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
        eval(`${thisName} = this;`);
      }
      this.file = new File(data);
      this.parsed = false;
      this.header = null;

      Object.defineProperty(this, 'layers',
        {get() { return this.layerMask.layers; }});

      RSVP.on('error', reason => console.error(reason));
    }

    // Parses the PSD. You must call this method before attempting to
    // access PSD data. It will not re-parse the PSD if it has already
    // been parsed.
    parse() {
      if (this.parsed) { return; }

      this.parseHeader();
      this.parseResources();
      this.parseLayerMask();
      this.parseImage();

      return this.parsed = true;
    }

    // The next 4 methods are responsible for parsing the 4 main sections of the PSD.
    // These are private, and you should never call them from your own code.
    parseHeader() {
      this.header = new Header(this.file);
      return this.header.parse();
    }

    parseResources() {
      const resources = new Resources(this.file);
      return this.resources = new LazyExecute(resources, this.file)
        .now('skip')
        .later('parse')
        .get();
    }

    parseLayerMask() {
      const layerMask = new LayerMask(this.file, this.header);
      return this.layerMask = new LazyExecute(layerMask, this.file)
        .now('skip')
        .later('parse')
        .get();
    }

    parseImage() {
      const image = new Image(this.file, this.header);
      return this.image = new LazyExecute(image, this.file)
        .later('parse')
        .ignore('width', 'height')
        .get();
    }

    // Returns a tree representation of the PSD document, which is the
    // preferred way of accessing most of the PSD's data.
    tree() { return new PSD.Node.Root(this); }
  };
  PSD.initClass();
  return PSD;
})());
