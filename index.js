'use strict';

var uuid = (function () {
    var counter = 0;
    return function () {
        return 'plugin-chart-' + (++counter);
    };
})();

var PKG = require('./package.json');
var ASSETS_SCRIPT_FILES = [
    'moment.min.js',
    'Chart.min.js'
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
                var output = [
                    '<div>',
                        '<canvas id="' + id + '" width="770" height="400"></canvas>',
                        '<script>new Chart(',
                            'document.getElementById("' + id + '").getContext("2d"),',
                            JSON.stringify(body),
                        ');</script>',
                    '</div>'
                ];
                return output.join('');
            }
        }
    }
};
