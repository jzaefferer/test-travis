requirejs.config({
	'appdir': '../',
  'baseUrl': './',
  'paths': {

  	//{{app}}
    'foo': 'app/foo/foo',

    //{{libs}}
    
    
    
    
    
		'jquery.exists': 'libs/jquery.exists/jquery.exists',
		'jquery': 'libs/jquery/dist/jquery.min'
  },
  'shim': {
    'jquery.exists': ['jquery'],
    
  }
});

requirejs(['app/main']);
