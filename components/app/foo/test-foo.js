define(['foo'], function(Foo) {

  'use strict';

  var TestFoo = {
    startTests: function() {

      module("Foo");

      test("Foo return Test", function() {
        equal(Foo.foo(), "foo", "Function should return 'foo'");
      });

      test("Bar return Test", function() {
        equal(Foo.bar(), "bar", "Function should return 'bar'");
      });

      // asyncTest("Foo Test", function() {
      //   expect(1);

      //   $('#qunit-fixture').load('../components/app/foo/foo.html', function(data) {
      //     Foo.init();
      //     ok($('.Foo').hasClass('lorem'), ".Foo should have class 'lorem'");
      //     QUnit.start();
      //   });

      // });

    }
  };

  return {
    startTests: TestFoo.startTests
  };

});
