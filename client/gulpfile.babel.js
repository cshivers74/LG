import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {
  return browserify("app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));
});


// // loads various gulp modules
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// var minifyCSS = require('gulp-minify-css');
// var autoprefixer = require('gulp-autoprefixer');
// var rename = require('gulp-rename');

// // create task
// gulp.task('css', function(){
//     gulp.src('src/css/**/*.css')
//         .pipe(minifyCSS())
//         .pipe(rename('style.min.css'))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
//         .pipe(concat('style.min.css'))
//         .pipe(gulp.dest('dist/css'))
// });

gulp.task("libs", () => {
  return browserify(
    [
      "../node_modules/angular-material/angular.js",
      "../node_modules/angular-material/angular-animate.js",
      "../node_modules/angular-material/angular-aria.js",
      "../node_modules/angular-material/angular-messages.js",
      "../node_modules/angular-material/angular-material.js"
    ])
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n"); // TODO: refactor dupe from above
      this.emit("end");
    })
    .pipe(source('libs.js'))
    .pipe(gulp.dest('dist'));
});



gulp.task("watch", ["transpile", "libs"], () => {
  gulp.watch("**/*", ["transpile", "libs"]);
});

