// required libraries
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglifycss = require("gulp-uglifycss");
const terser = require("gulp-terser");
const sass = require("gulp-sass");

// js paths

const js_paths = [
  "./js/jquery.min.js",
  "./js/aos.js",
  "./js/script.js",
];

//  function's

function cssPath() {
  gulp
    .src("scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("css/"));
  const css_paths = [
    "./css/aos.css",
    "./css/nv.css",
    "./css/style.css",
  ];
  return gulp
    .src(css_paths, { allowEmpty: true })
    .pipe(concat({ path: "style.min.css", stat: { mode: 438 } }))
    .pipe(uglifycss({ uglyComments: true }))
    .pipe(gulp.dest("build/"));
}

function jsPath() {
  return (
    gulp
      .src(js_paths, { allowEmpty: true })
      .pipe(
        terser({
          ecma: 5, // specify one of: 5, 2015, 2016, etc.
          keep_classnames: false,
          keep_fnames: false,
          ie8: true,
          module: false,
          nameCache: null, // or specify a name cache object
          safari10: false,
          toplevel: false,
          warnings: false,
        })
      )
      .pipe(concat({ path: "script.min.js", stat: { mode: 438 } }))
      // .pipe(uglify().on('error', function(e) { console.log(e); }))
      .pipe(gulp.dest("build/"))
  );
}
async function style() {
  cssPath();
}
async function watch() {
  //customize watch
  gulp.watch("./scss/*.scss", style);

  // watch the js files for build
  gulp.watch(js_paths).on("change", jsPath);
}
exports.style = style;
exports.watch = watch;
