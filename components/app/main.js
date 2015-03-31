
require([
  'jquery',
  'foo',
  'jquery.exists'
], function($, Foo) {

  'use strict';

  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      // this.loadDynamicModules();

      // Modules
      Foo.init();



    }
    // loadDynamicModules: function() {
      // this.$bar.exists(function() {
      //   console.log('.bar exists: load bar');
      //   require(['assets/js/_deferred/bar']);
      // });
    // }
  };

  Main.init();

});
