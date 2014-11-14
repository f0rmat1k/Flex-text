var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gfi = require("gulp-file-insert");

gulp.task('default', function () {
    return gulp.src('jquery/jquery.tmp.js')
        .pipe(gfi({
            "/* flex-text */": "flex-text.js",
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// var fs = require('fs');
//
// gulp.task('jquery', function() {
//     var jQtemplate = fs.readFileSync('./jquery/jquery.tmp.js', 'utf8'),
//         flexText = fs.readFileSync('flex-text.js', 'utf8');
//
//     var jqPlugin = jQtemplate.replace('//flex-text', flexText);
//
//     fs.writeFileSync('jquery.flextext.js', jqPlugin);
// });
