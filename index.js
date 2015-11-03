'use strict';

var uuid = (function () {
    var counter = 0;
    return function () {
        return 'plugin-chart-' + (++counter);
    };
})();

var PKG = require('./package.json');
var ASSETS_SCRIPT_FILES = [
    'd3/d3.min.js',
    'c3/c3.min.js'
];


var assetsScriptTag = function (staticBase, fileName) {
    return [
        '<script src="',
        staticBase,
        '/plugins/',
        PKG.name,
        '/',
        fileName,
        '"></script>'
    ].join('');
};

module.exports = {
    book: {
        assets: './assets',
        css: [
            'c3/c3.min.css'
        ],
        html: {
            'head:end': function (options) {
                return ASSETS_SCRIPT_FILES.map(function (f) {
                    return assetsScriptTag(options.staticBase, f);
                }).join('');
            }
        }
    },
    blocks: {
        chart: {
            // shortcuts: {
            //     parsers: [
            //         'markdown',
            //         'asciidoc',
            //         'restructuredtext'
            //     ],
            //     start: '```chart',
            //     end: '```'
            // },
            process: function (blk) {
                var id = uuid();
                var body = {};
                try {
                    eval('body=' + blk.body.trim());
                } catch (e) {
                    console.error(e);
                }
                // bind to element
                body.bindto = '#' + id;
                var output = [
                    '<div>',
                        '<div id="' + id + '"></div>',
                        '<script>c3.generate(',
                            JSON.stringify(body),
                        ');</script>',
                    '</div>'
                ];
                return output.join('');
            }
        }
    }
};
