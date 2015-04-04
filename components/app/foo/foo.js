define(['jquery'], function($) {

  'use strict';

  var Foo = {

    foo: function() {
      return "foo";
    },

    bar: function () {
      return "bar";
    },

    oof: function() {
      return "oof";
    }

  };

  return {
    foo: Foo.foo,
    oof: Foo.oof,
    bar: Foo.bar
  };

});
