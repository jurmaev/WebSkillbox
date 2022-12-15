const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');

let isBuild = false;
let folder = 'dev';

const toBuild = (onDone) => {
    isBuild = true;
    folder = 'dist';
    onDone();
}

const clean = () => {
    return del([folder])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest(`${folder}/resources`))
};

const styles = () => {
    return src(['src/styles/**/*.css', 'src/styles/**/styles.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(!isBuild, sourcemaps.init()))
        .pipe(gulpIf(isBuild, cleanCSS({
            level: 2,
        }), autoprefixer({
            cascade: false,
        })))
        .pipe(concat('main.css'))
        .pipe(gulpIf(!isBuild, sourcemaps.write()))
        .pipe(dest(folder))
        .pipe(gulpIf(isBuild, browserSync.stream()))
};

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpIf(isBuild, htmlMin({
            collapseWhitespace: true,
        })))
        .pipe(dest(folder))
        .pipe(gulpIf(isBuild, browserSync.stream()))
};

// const svgSprites = () => {
//     return src('src/img/svg/**/*.svg')
//         .pipe(svgSprite({
//             mode: {
//                 stack: {
//                     sprite: '../sprite.svg'
//                 }
//             }
//         }))
//         .pipe(dest('dist/images'))
// }

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/*.svg'
    ])
        .pipe(image({}))
        .pipe(dest(`${folder}/images`))
        .pipe(gulpIf(isBuild, browserSync.stream()))
}

const scripts = () => {
    return src([
        'src/js/resources/**/*.js',
        'src/js/main.js'
    ])
        .pipe(gulpIf(!isBuild, sourcemaps.init()))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulpIf(isBuild, uglify().on('error', notify.onError())))
        .pipe(concat('app.js'))
        .pipe(gulpIf(!isBuild, sourcemaps.write()))
        .pipe(dest(folder))
        .pipe(gulpIf(isBuild, browserSync.stream()))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dev',
        }
    });
}

watch('src/**/*.html', htmlMinify);
watch(['src/styles/**/*.css', 'src/styles/**/*.scss'], styles);
watch([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/*.svg'
], images);
// watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

exports.default = series(clean, resources, htmlMinify, scripts, styles, images, watchFiles);
exports.build = series(toBuild, clean, resources, htmlMinify, scripts, styles, images)