'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var sequence = require('gulp-sequence');
var paths = require('./paths');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var spriteSmith = require('gulp.spritesmith');

var browserSync = require('browser-sync').create();


gulp.task('default',  sequence(
  'sprites',
  'images',
  'markup',
  [
    'styles',
    'js'
  ]
));


gulp.task('watch', function(){

  browserSync.init({
      server: "../web/demo/"
  });

  gulp.watch(paths.sprites.origin, {interval: 250}, ['sprites', 'styles']);
  gulp.watch(paths.images.origin, {interval: 250}, ['images']);
  gulp.watch([paths.markup.origin, paths.markup.test_origin], {interval: 250}, ['markup']);
  gulp.watch([paths.module_styles.origin, paths.main_styles.watch], {interval: 250}, ['styles']);
  gulp.watch(paths.test_javascript.origin, {interval: 250}, ['js']);

  gulp.watch(["../web/demo/index.html", "../web/demo/js/*.js"]).on('change', browserSync.reload);

});


gulp.task('js', function(){

  gulp.src(paths.test_javascript.origin)
    .pipe(concat('app.js').on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.test_javascript.dest));

  gulp.src(paths.module_javascript.origin)
    .pipe(gulp.dest(paths.module_javascript.dest));

  gulp.src(paths.main_javascript.origin)
    .pipe(gulp.dest(paths.main_javascript.dest));

});

gulp.task('styles', function(){

  //Prod assets:
  gulp.src(paths.module_styles.origin)
    .pipe(sass.sync().on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.module_styles.dest))

  gulp.src(paths.main_styles.origin)
    .pipe(sass.sync().on('error', gulpUtil.log))
    .pipe(concat('main.css').on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.main_styles.dest))

  //Test assets:
  gulp.src([paths.main_styles.origin, paths.module_styles.origin])
    .pipe(sass.sync().on('error', gulpUtil.log))
    .pipe(concat('app.css').on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.main_styles.test_dest))
    .pipe(browserSync.stream());

});

gulp.task('sprites', function(){
  var stream = gulp.src(paths.sprites.origin)
    .pipe(spriteSmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss',
      cssTemplate: './sprite-template.scss.handlebars',
      algorithm: 'binary-tree',
      padding: 4
    }).on('error', gulpUtil.log));
  stream.img.pipe(gulp.dest(paths.sprites.dest));
  stream.img.pipe(gulp.dest(paths.sprites.test_dest));
  stream.css.pipe(gulp.dest(paths.sprites.styles));
});

gulp.task('markup', function(){
  gulp.src(paths.markup.origin)
    .pipe(jade({pretty: true}).on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.markup.dest))
  gulp.src(paths.markup.test_origin)
    .pipe(jade({pretty: true}).on('error', gulpUtil.log))
    .pipe(gulp.dest(paths.markup.test_dest))
});

gulp.task('images', function(){
  gulp.src(paths.images.origin)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(gulp.dest(paths.images.test_dest))
});
