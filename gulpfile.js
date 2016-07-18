var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create(); // create a browser sync instance.

gulp.task('sass', function () {
  return gulp.src('./src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});
 

gulp.task('serve', function() {
  //2. serve at custom port
  var server = gls.static('./', 3030);
  // var server = gls('./', true, 3030);
  server.start();

  browserSync.init({
    server: "./app"
  });
  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['./src/*.scss', './index.html', './src/images/***'], ['sass'], function (file) {
    server.notify.apply(server, [file]);
    //gulp.watch("scss/*.scss", ['sass']);
    //gulp.watch("*.html").on('change', bs.reload);
  });
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['serve']);

