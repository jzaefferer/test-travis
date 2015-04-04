define(['foo'], function(Foo) {

  'use strict';

  module("Foo");

  test("Foo return Test", function() {
    equal(Foo.foo(), "foo", "Function should return 'foo'");
    equal(Foo.oof(), "oof", "Function should return 'oof'");
  });

  test("Bar return Test", function() {
    equal(Foo.bar(), "barz", "Function should return 'bar'");
  });

  // asyncTest("Foo Test", function() {
  //   expect(1);

  //   $('#qunit-fixture').load('../components/app/foo/foo.html', function(data) {
  //     Foo.init();
  //     ok($('.Foo').hasClass('lorem'), ".Foo should have class 'lorem'");
  //     QUnit.start();
  //   });

  // });

});
