const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');
// const child = require('child_process');

gulp.task('move', () => {
  gulp.src("src/static/**")
  .pipe(gulp.dest('dist/static'))
})

gulp.task('scripts', ['move'], () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

// gulp.task('server', function() {
//   var server = child.spawn('node', ['index.js']);
// })

gulp.task('default', ['watch', 'assets']);
