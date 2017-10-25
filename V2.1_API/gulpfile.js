
//
//
//    GULPFILE.JS
//    configuration for gulp build-system
//
//

/*
    This gulp build-system watches for changes in *.js files in the modules folder
    and runs webpack, if they change.
*/

// =============================================================================

//
//  Import required modules
//

const gulp = require('gulp')
const webpack = require('webpack-stream')

// =============================================================================

//
//  Setup Gulp Stuff
//

// default task for this build system
gulp.task('default', function(){
  console.log("Wheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  gulp.start('webpack')
})

// webpack task
gulp.task('webpack', function(){
  return gulp.src('./modules/app.js')
             .pipe(webpack( require('./webpack.config.js') ))
             .pipe(gulp.dest('./'))
})

// watch tasks
gulp.watch('./modules/**.js', function(){
  gulp.start('webpack')
})
