require.config({
    baseUrl: "../",
    paths: {
      'jquery': 'components/libs/jquery/dist/jquery.min',
      'test-Foo': 'components/app/foo/test-Foo',
      'foo': 'components/app/foo/foo'
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
