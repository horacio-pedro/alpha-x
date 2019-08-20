const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')

gulp.task('minify-css', async function() {

    gulp.src([
        './public/css/*.css',
        './public/css/vendor/**/*.css'
    ])
    .pipe(concat('stylesheet.bundle.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));

})

gulp.task('compress', async function() {

    gulp.src([
        './public/js/jquery.min.js',
        './public/js/main.js',
        './public/js/moment.js',
        './public/js/nav.min.js',
        './public/js/vendor/apex/daterange/daterange.js',
        './public/js/vendor/apex/custom/*js'
    ])
    .pipe(concat('script.bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))

})

gulp.task('default', gulp.parallel('minify-css', 'compress'))