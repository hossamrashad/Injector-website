// npm i gulp -g
// npm i --save-dev gulp
var gulp = require("gulp");
// npm install --save-dev gulp-concat
var concat = require("gulp-concat");
// npm install --save-dev gulp-autoprefixer
var autoprefixer = require("gulp-autoprefixer");
// npm install sass gulp-sass --save-dev
var sass = require("gulp-sass")(require("sass"));
// npm i gulp-pug
var pug = require("gulp-pug");
// npm i static-server -save
// npm install --save-dev gulp-livereload
var livereload = require("gulp-livereload");
// npm i gulp-sourcemaps --save-dev
var sourcemaps = require("gulp-sourcemaps");
// npm install --save-dev gulp-uglify
var uglify = require("gulp-uglify");
// npm i gulp-notify --save-dev
var notify = require("gulp-notify");
// npm install --save-dev gulp-zip
var zip = require("gulp-zip");

// =============================== Task Html =============================== //
gulp.task("html", function () {
  return gulp
    .src("project/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload())
    .pipe(notify("Html Task Is Done"));
});

// =============================== Task Scss =============================== //
gulp.task("scss", function () {
  return gulp
    .src("project/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 20 versions"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});

// ============================== Task Jquery ============================== //
gulp.task("jquery", function () {
  return gulp
    .src("project/js/jquery/*.*")
    .pipe(concat("jquery.js"))
    .pipe(gulp.dest("dist/js/jquery"))
    .pipe(uglify())
    .pipe(livereload())
    .pipe(notify("jquery Task Is Done"));
});

// ============================= Task js ================================= //
gulp.task("js", function () {
  return gulp
    .src("project/js/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("js.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js/js"))
    .pipe(notify("Js Task Is Done"))
    .pipe(livereload());
});

// ============================= Task Es6 =============================== //
gulp.task("es6", function () {
  return (
    gulp
      .src("project/js/es6/**/*.js")
      .pipe(sourcemaps.init())
      // .pipe(babel({ presets: ["@babel/env"] }))
      .pipe(concat("es6.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js/es6"))
      .pipe(notify("ES6 Task Is Done"))
      .pipe(livereload())
  );
});

// ============================= Task vue ================================= //
gulp.task("vue", function () {
  return gulp
    .src("project/js/vue/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("vue-app.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js/vue"))
    .pipe(notify("Vue App Task Is Done"))
    .pipe(livereload());
});

// =============================== Task react =============================== //
gulp.task("react", function () {
  return gulp
    .src("project/js/react/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("react-app.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js/react"))
    .pipe(notify("React App Task Is Done"))
    .pipe(livereload());
});

// ============================== Libs Css Task ================================ //
gulp.task("libs-css", function () {
  return gulp
    .src("project/libs-css/**/*")
    .pipe(gulp.dest("dist/css/libs"))
    .pipe(livereload())
    .pipe(notify("Libs Css Task Is Done"));
});

// =========================== Libs Js Task =================================== //
gulp.task("libs-js", function () {
  return gulp
    .src("project/libs-js/**/*.*")
    .pipe(gulp.dest("dist/js/libs"))
    .pipe(livereload())
    .pipe(notify("Libs Js Task Is Done"));
});

// =========================== Task For Learn Scss ============================ //
// --------------------------- Task For Learn Scss ---------------------------- //
gulp.task("scss-js", function () {
  return (
    gulp
      .src("project/js/scss/**/*.js")
      .pipe(sourcemaps.init())
      // .pipe(babel({ presets: ["@babel/env"] }))
      .pipe(concat("scss.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js/scss"))
      .pipe(notify("Js Scss Task Is Done"))
      .pipe(livereload())
  );
});
gulp.task("scss-css", function () {
  return gulp
    .src("project/scss/scss.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 20 versions"))
    .pipe(concat("scss.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});
// =========================== Test Task ===================================== //

gulp.task("scss-test", function () {
  return gulp
    .src("project/scss/test.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 20 versions"))
    .pipe(concat("test.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});
// ============================== Images Task ================================ //
gulp.task("compressImages", function () {
  return (
    gulp
      .src("project/images/**/*")
      // .pipe(imagemin({ progressive: true }))
      .pipe(gulp.dest("dist/images"))
  );
});

// =============================== Zip Compress Files =============================== //
gulp.task("compress", function () {
  return gulp
    .src("dist/**/*.*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files Is Compressed To Zip "));
});

// ============================ Task watch ================================== //
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  // = Html
  gulp.watch("project/pug/**/*.pug", gulp.series("html"));
  // = Css
  gulp.watch("project/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("project/libs-css/**/*", gulp.series("libs-css"));
  // = Javascript
  gulp.watch("project/libs-js/**/*", gulp.series("libs-js"));
  gulp.watch("project/js/js/**/*.js", gulp.series("js"));
  gulp.watch("project/js/jquery/*.*", gulp.series("jquery"));
  gulp.watch("project/js/es6/**/*.js", gulp.series("es6"));
  gulp.watch("project/js/vue/**/*.js", gulp.series("vue"));
  gulp.watch("project/js/react/**/*.js", gulp.series("react"));
  // = Learn Scss
  gulp.watch("project/scss/scss/*.scss", gulp.series("scss-css"));
  gulp.watch("project/js/scss/scss.js", gulp.series("scss-js"));
  //= Test
  gulp.watch("project/scss/test/*.scss", gulp.series("scss-test"));
  // = Images
  gulp.watch("project/images/**/*", gulp.series("compressImages"));
  // = Zip
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // gulp.watch("output/**/*.*", gulp.series("deploy"));
});
// = Default
// gulp.task("default", ["watch"]);
gulp.task("default", gulp.series("watch"));
