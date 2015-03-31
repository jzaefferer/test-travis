define(['jquery'], function($) {

  'use strict';

  var Foo = {

    foo: function() {
      return "foo";
    },

    bar: function () {
      return "bar";
    }

  };

  return {
    foo: Foo.foo,
    bar: Foo.bar
  };

});
