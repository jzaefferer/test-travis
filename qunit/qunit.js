require.config({
    baseUrl: "../",
    paths: {
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // Test for Foo
      'foo': 'components/app/foo/foo',
      'test-Foo': 'components/app/foo/test-Foo'
    },
    shim: {
     'QUnit': {
        exports: 'QUnit'
      }
    }
});

require(['test-Foo'], function (Foo) {

  Foo.startTests();

  QUnit.load();
  QUnit.start();

});
