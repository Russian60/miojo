'use strict';
var yeoman  = require('yeoman-generator');
var chalk   = require('chalk');
var yosay   = require('yosay');
var mkdirp  = require('mkdirp');

module.exports = yeoman.generators.NamedBase.extend({

  writing: function(){
    var name = this.name;

    function capitalize(str) {
      return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    this.fs.copyTpl(
      this.templatePath('_module.js'),
      this.destinationPath('source/shared/'+name+'/'+name+'.module.js'),
      { moduleSuffix: name.toLowerCase() }
    );

    this.fs.copyTpl(
      this.templatePath('_service.js'),
      this.destinationPath('source/shared/'+name+'/'+name+'.service.js'),
      { title: capitalize(name), moduleSuffix: name.toLowerCase() }
    );

    this.conflicter.force = true;
    this.fs.copy(
      this.destinationPath('source/app.components.js'),
      this.destinationPath('source/app.components.js'),
      {
        process: function(contents) {
          /* Any modification goes here. Note that contents is a Buffer object */
          var newContent = contents.toString().replace(/(\/\* @Inject \*\/)/i, "'app."+name.toLowerCase()+"',\n\t\t\t/* @Inject */");
          return newContent;
        }
      });
    },

});
