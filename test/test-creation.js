/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('sandkasten generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('sandkasten:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expectedFiles = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'index.html',
      'bower.json',
      'main.js'
    ];

    var expectedContent = [
      ['index.html', /<title>myapp<\/title>/],
      ['bower.json', /"name": "myapp"/]
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true,
      'appName': 'myapp'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });

  it('should generate an angular app', function (done) {
    var expectedFiles = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'index.html',
      'bower.json',
      'main.js'
    ];

    var expectedContent = [
      ['index.html', /<title>myapp<\/title>/],
      ['bower.json', /"name": "myapp"/],
      ['bower.json', /"angular": "*"/]
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true,
      'appName': 'myapp',
      'angularModule': 'angularModule'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      helpers.assertFileContent(expectedContent);
      done();
    });
  });
});
