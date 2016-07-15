var grunt = require('grunt');
var fs = require('fs');

var path = 'test/sample/languages/';

exports.spreadOut = {
  main: function(test) {
    'use strict';

    test.expect(4);

    test.ok(fs.existsSync(path + 'translation-en.json'), 'The -en bundle should exist.');
    test.ok(fs.existsSync(path + 'translation-es.json'), 'The -es bundle should exist.');
    test.ok(fs.existsSync(path + 'translation-fr.json'), 'The -fr bundle should exist.');
    test.ok(fs.existsSync(path + 'nested-en.json'), 'The nested bundle should exist.');

    test.done();
  },

  checkBundleContents: function(test) {
    'use strict';

    test.expect(4);

    var 
      enBundle = JSON.parse(fs.readFileSync(path + 'translation-en.json', 'utf8')),
      nestedBundle = JSON.parse(fs.readFileSync(path + 'nested-en.json', 'utf8'));

    test.equal(enBundle['widget-a'].title, 'Activities', 'The title of widget-a should be Activities.');
    test.equal(enBundle['widget-b'].has_been, 'has been ', 'The has_been attribute of widget-b should be "has been".');
    test.equal(nestedBundle['en']['widget-a'].title, 'Activities', 'The nested title of widget-a should be Activities.');
    test.equal(nestedBundle['en']['widget-b'].has_been, 'has been ', 'The nested has_been attribute of widget-b should be "has been".');

    test.done();
  }
};


exports.together = {
  main: function(test) {
    'use strict';

    test.expect(1);

    test.ok(fs.existsSync(path + 'en/translation-combined.json'), 'The -combined bundle should exist.');

    test.done();
  },

  checkBundleContents: function(test) {
    'use strict';

    test.expect(3);

    var enBundle = JSON.parse(fs.readFileSync(path + 'en/translation-combined.json', 'utf8'));

    test.equal(enBundle['widget-a'].title, 'Activities', 'The title of widget-a should be Activities.');
    test.equal(enBundle['widget-b'].has_been, 'has been ', 'The has_been attribute of widget-b should be "has been".');
    test.equal(enBundle['widget-c'], undefined, 'The file not included in the "include" property should be ignored.');

    test.done();
  }
};
