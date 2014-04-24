'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var SandkastenGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          npm: false
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Sandkasten generator.'));

    var prompts = [{
      name: 'appName',
      message: 'name of the app',
      default: path.basename(process.cwd())
    }, {
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }, {
      type: 'confirm',
      name: 'angularModule',
      message: 'Would you like use angular?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appName = props.appName;
      this.angularModule = props.angularModule;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.template('_bower.json', 'bower.json');
    this.copy('_index.html', 'index.html');
    this.copy('_main.js', 'main.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SandkastenGenerator;
