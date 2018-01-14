var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'test',
    spec_files: [
        '*.test.js',
    ],
    helpers: [
        'helpers/**/*.js'
    ]
});


jasmine.execute();