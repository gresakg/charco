var gulp 		= require('gulp');
var less		= require('gulp-less');
var webserver 	= require('gulp-webserver');
var plumber		= require('gulp-plumber');
var concat 		= require('gulp-concat');
var cleancss 	= require('gulp-clean-css');
var rename 		= require('gulp-rename');
var jshint		= require('gulp-jshint');
var uglify		= require('gulp-uglify');

gulp.task('import',function() {
	gulp.src('./node_modules/jquery/dist/jquery.min.js')
	.pipe(gulp.dest("./js/"))
	;
});


gulp.task('less', function() {
	return gulp.src('./src/less/index.less')
	.pipe(concat('styles.css'))
	.pipe(plumber())
	.pipe(less({
		//paths: [path.join(__dirname,'./node_modules/font-awesome/less/'),
		//		path.join(__dirname,'./node_modules/uikit/src/less/')]
	}))
	.pipe(gulp.dest('./css'))
	.pipe(concat('styles.css'))
	.pipe(cleancss())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest('./css'))
	;
});

gulp.task('scripts', function() {
	return gulp.src([
		'./src/js/*.js'
		])
	.pipe(jshint())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./js'))
	.pipe(rename('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js'))
	;
})

gulp.task('webserver', function() {
	gulp.src("./")
	.pipe(webserver({
		livereload: true,
		directoryListing: true
	}))
	;
});

gulp.task('watch',function(){
	gulp.watch('src/js/*.js',['scripts']);
	gulp.watch('src/less/*.less',['less']);
})

gulp.task('default',['scripts','less','webserver','watch'])