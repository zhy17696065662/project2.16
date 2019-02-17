var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');
var fs=require('fs');
var path=require('path');
var url=require('url');
var data=require('./src/datas/data.json');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var babel=require('gulp-babel');
var clean=require('gulp-clean-css');
var htmlmin=require('gulp-htmlmin');


//编译sass
gulp.task('scss',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
})
//起服务
gulp.task('servers',function(){
    return gulp.src('./src/')
    .pipe(server({
        port:8888,
        open:true,
        livereload:true,
        middleware:function(req,res,next){
            console.log(req.url)
            var pathname=url.parse(req.url).pathname;
            if(pathname=='/favicon.ico'){
                return res.end('')
            }else if(pathname=='/data/blus'){
                res.end(JSON.stringify({code:1,data:data}))
            }else{
                var pathname=pathname=='/'?'index.html':pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
            }
        }
        
    }))
})
//监听事件
gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss',gulp.series('scss'))
    gulp.watch('./src/js/*.js',gulp.series('scss'))
})
//开发环境
gulp.task('dev',gulp.series('scss','servers','watch'))

//压缩css
gulp.task('dcss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(clean())
    .pipe(gulp.dest('./bulid/css/'))
})

//编译合并压缩js
gulp.task('devJs',function(){
    return gulp.src('./src/js/diy/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets:'es2015'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./bulid/js/'))
})
//压缩html
gulp.task('dhtml',function(){
    return gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('./bulid/'))
})
