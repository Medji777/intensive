let gulp = require('gulp'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel'),
    cssMin = require('gulp-csso'),
    htmlMin = require('gulp-htmlmin'),
    jsMin = require('gulp-uglifyjs'),
    autoPrefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    BS = require('browser-sync'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    serverPhp = require('gulp-connect-php');


gulp.task('html',()=>{
    gulp.src('./app/html/index.html')
        .pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('Done html!'));
    BS.reload({stream:false});
});

gulp.task('js',()=>{
    gulp.src('./app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(jsMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('Done js!'));
    BS.reload({stream: false});
});

gulp.task('json',()=>{
    gulp.src('./app/js/**/*.json')
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify('Done json!'));
    BS.reload({stream: false});
});

gulp.task('css',()=>{
    gulp.src('./app/css/**/*.css')
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssMin())
        .pipe(autoPrefix())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify('Done css!'));
    BS.reload({stream: false});
});

gulp.task('icons',()=>{
    gulp.src('./app/icons/**/*.svg')
        .pipe(gulp.dest('./dist/icons'))
        .pipe(notify('Done icons'));
    BS.reload({stream: false});
});

gulp.task('img',()=>{
    gulp.src('./app/img/**/*.jpg')
        .pipe(gulp.dest('./dist/img'))
        .pipe(notify('Done img'));
    BS.reload({stream: false});
});

gulp.task('logo',()=>{
    gulp.src('./app/logo/**/*.svg')
        .pipe(gulp.dest('./dist/logo'))
        .pipe(notify('Done logo'));
    BS.reload({stream: false});
});

//gulp.task('php',()=>{
    //gulp.src('./app/backend/**/*.php')
       // .pipe(gulp.dest('./dist/php'))
        //.pipe(notify('Done php'));
    //BS.reload({stream: false});
//});

gulp.task('clear',()=>{
    delFiles.sync(['./dist/*']);
});

gulp.task('watchFiles',()=>{
    gulp.watch(['./app/html/index.html'],['html']);
    gulp.watch('./app/js/**/*.js', ['js']);
    gulp.watch('./app/js/**/*.json', ['json']);
    gulp.watch('./app/css/**/*.css', ['css']);
    gulp.watch('./app/icons/**/*.svg', ['svg']);
    gulp.watch('./app/img/**/*.jpg', ['jpg']);
    gulp.watch('./app/logo/**/*.svg', ['svg']);
    //gulp.watch('./app/backend/**/*.php', ['php']);
});

gulp.task('SPhp',()=>{
    serverPhp.server({
        base: './dist',
        port: 8000,
        bin: 'D:/php5.6/php/php.exe',
        ini: 'D:/php5.6/php/php.ini'},()=>{
        BS({
            proxy: '127.0.0.1',
            port: '8000'
        })
    })
});

/*gulp.task('server',()=>{
    BS({
        server: {
            baseDir: './dist'
        }
    })
});*/

gulp.task('default',['clear','html','js','json','css','icons','img','logo','watchFiles','SPhp'],()=>{
    console.log('work default');
});