var grunt = require('grunt');
var fs = require('fs');

var path = 'test/sample/languages/';

exports.i18next = {
  main: function(test) {
    'use strict';

    test.expect(3);

    test.ok(fs.existsSync(path + 'translation-en.json'), 'The -en bundle should exist.');
    test.ok(fs.existsSync(path + 'translation-es.json'), 'The -es bundle should exist.');
    test.ok(fs.existsSync(path + 'translation-fr.json'), 'The -fr bundle should exist.');

    test.done();
  },

  checkBundleContents: function(test) {
    'use strict';

    test.expect(2);

    var enBundle = JSON.parse(fs.readFileSync(path + 'translation-en.json', 'utf8'));

    test.equal(enBundle['widget-a'].title, 'Activities', 'The title of widget-a should be Activities.');
    test.equal(enBundle['widget-b'].has_been, 'has been ', 'The has_been attribute of widget-b should be "has been".');

    test.done();
  }
};