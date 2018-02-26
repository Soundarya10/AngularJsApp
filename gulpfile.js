var gulp = require('gulp');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minify_css = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var templateCache = require('gulp-angular-templatecache');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();

var paths = {
	index: './app/index.html',
	appStyles: './app/styles/*.scss',
	appScripts: ['./app/js/*.js', './app/js/**/*.js'],
	fonts: './app/fonts/*',
	images: './app/images/*',
	templates: ['./app/views/**/*.html'],
	dest: './build/'
};

// ---------------------------------------------------------------------

gulp.task('vendor-styles', function () {
	var vendorStyles = mainBowerFiles({ filter: new RegExp('.*less$', 'i') });
	return gulp.src(vendorStyles)
		.pipe(less())
		.pipe(plumber())
		.pipe(concat('vendor.css'))
		.pipe(minify_css())
		.pipe(gulp.dest(paths.dest + '/css'))
});

gulp.task('app-styles', function () {
	return gulp.src(paths.appStyles)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass())
		.pipe(concat('app-min.css'))
		.pipe(sourcemaps.write())
		.pipe(minify_css())
		.pipe(gulp.dest(paths.dest + '/css'))
});

gulp.task('vendor-scripts', function () {
	var vendorScripts = mainBowerFiles({ filter: new RegExp('.*js$', 'i') });
	return gulp.src(vendorScripts)
		.pipe(plumber())
		.pipe(concat('vendor.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dest + '/js'))
});

gulp.task('index', function () {
	gulp.src(paths.index)
		.pipe(gulp.dest(paths.dest))
});

gulp.task('app-scripts', function () {
	return gulp.src(paths.appScripts)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(concat('app-min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dest + '/js'))
});

gulp.task('templates', function () {
	gulp.src(paths.templates)
		.pipe(templateCache({ standalone: false, module: 'AngularApp' }))
		.pipe(gulp.dest(paths.dest + '/js'))
});

gulp.task('fonts', function () {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dest + '/fonts'))
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.dest + '/images'))
});

gulp.task('watch', function () {
	gulp.watch(paths.appStyles, ['app-styles']);
	gulp.watch(paths.appScripts, ['app-scripts']);
	gulp.watch(paths.templates, ['templates']);
	gulp.watch(paths.index, ['index']);
});

gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task('default', ['vendor-styles', 'app-styles', 'vendor-scripts', 'app-scripts', 'index', 'templates', 'fonts', 'images', 'serve', 'watch']);