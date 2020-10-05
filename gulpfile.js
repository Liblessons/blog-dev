const { series } = require('gulp');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
 


function sassF() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
};
 



function pugDist(){
    return gulp.src('./src/pug/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build'));

}


function sassBuild(){
    return gulp.src('./src/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./build/css'));
}

function pugBuild(){
    return gulp.src('./src/pug/pages/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('./build'))
            .pipe(browserSync.stream());
}

function watchBuild(){
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        browser: 'chrome'
    });

    gulp.watch('./src/pug/**/*.pug', pugBuild);
    gulp.watch('./src/sass/**/*.scss', sassF);
}


exports.watch = watchBuild;

exports.build = series(pugDist, sassBuild);
//exports.build_too = build2;