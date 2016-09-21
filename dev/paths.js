module.exports = {
  test_javascript:{
    origin:['./js/**/*.js', './modules/**/*.js'],
    dest: '../web/demo/js/',
  },
  module_javascript:{
    origin:['./modules/**/*.js'],
    dest: '../web/modules/',
  },
  main_javascript:{
    origin:'./js/script.js',
    dest: '../web/js/'
  },
  markup: {
    origin: './modules/**/*.jade',
    test_origin: './markup/*.jade',
    dest: '../web/modules/',
    test_dest: '../web/demo/'
  },
  module_styles:{
    origin:'./modules/**/*.scss',
    dest: '../web/modules/'
  },
  main_styles:{
    origin:'./sass/main.scss',
    watch: './sass/**/*.scss',
    dest: '../web/css/',
    test_dest: '../web/demo/css/'
  },
  sprites: {
    origin: './sprites/*.png',
    styles:  './sass/transient/',
    dest: '../web/images/',
    test_dest: '../web/demo/images/'
  },
  images: {
    origin: './images/*.{png,jpg,gif}',
    dest: '../web/images',
    test_dest: '../web/demo/images/'
  }

}
