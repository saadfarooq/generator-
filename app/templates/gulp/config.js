var build = 'build',
  client = 'client';

var src = {
  pages:  client + '/pages',
  images: client + '/images',
  fonts:  client + '/fonts',
  sass:   client + '/styles',
  includes:   client + '/includes',
  models:     client + '/models',
  services:   client + '/services',
  components: client + '/components',
};

var dest = {
  html:   build,
  js:     build + '/js',
  css:    build + '/css',
  fonts:  build + '/fonts',
  images: build + '/images'
};

var globSpecs = client + '/**/*.spec.js';
var vendorJS  = client + '/vendor/**/*';

var globs = {
  html: [src.pages + '/**/*.html'],
  sass: [src.sass + '/**/*.scss'],
  js: [
    '!' + globSpecs,
    src.pages + '/**/*.js'
  ],
  common: [
    '!' + globSpecs,
    src.models + '/**/*.js',
    src.services + '/**/*.js',
    src.components + '/**/*.js'
  ],
  build: [build + '/**/*'],
  test: [
    '!' + vendorJS,
    dest.js + '/vendor.js',
    src.models + '/**/*.js',
    src.services + '/**/*.js',
    src.components + '/**/*.js'
  ]
};

module.exports = {
  karmaConf: __dirname + '/karma.conf.js',
  buildFolder: build,
  src: src,
  dest: dest,
  globs: globs,
  prod: false
};
