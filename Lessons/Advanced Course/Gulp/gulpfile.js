const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify  = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');

const argv = require('yargs').argv;
const isBuild = argv._[0] === 'build';

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
};

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(gulpIf(!isBuild, sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(gulpIf(isBuild, cleanCSS({
            level:2,
        })))
        .pipe(gulpIf(!isBuild, sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
};

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpIf(isBuild, htmlMin({
            collapseWhitespace: true,
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
};

const svgSprites = () => {
    return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}

const images = () => {
    return src([
        'src/img/**/*.jpg',
        'src/img/**/*.jpeg',
        'src/img/**/*.png',
        'src/img/*.svg'
    ])
    .pipe(image({}))
    .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(gulpIf(!isBuild, sourcemaps.init()))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpIf(isBuild, uglify().on('error', notify.onError())))
    .pipe(gulpIf(!isBuild, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    });
}

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/img/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

const exportSeries = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
exports.default = exportSeries;
exports.dev = exportSeries;
exports.build = exportSeries;