require.config({
    baseUrl: "../",
    paths: {
      'QUnit': 'components/libs/qunit/qunit/qunit',
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // Test for Foo
      'foo': 'components/app/foo/foo',
      'test-Foo': 'components/app/foo/test-Foo'
    },
    shim: {
     'QUnit': {
       exports: 'QUnit',
       init: function() {
         QUnit.config.autoload = false;
         QUnit.config.autostart = false;
       }
      }
    }
});

require(['test-Foo'], function (Foo) {
  QUnit.load();
  QUnit.start();
});
