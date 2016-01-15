'use strict';

var path = require('path');
path = 'default' in path ? path['default'] : path;

var _uuidCounter = 0;
function uuid() {
    return 'plugin-chart-' + ++_uuidCounter;
};

var PKG = require('../package.json');
function assetsTag(staticBase, fileName) {
    var filePath = staticBase + '/plugins/' + PKG.name + '/' + fileName;
    switch (path.extname(fileName)) {
        case '.js':
            return '<script src="' + filePath + '"></script>';
        case '.css':
            return '<link rel="stylesheet" href="' + filePath + '">';
        default:
            return '';
    }
};

function c3(id, body) {
    // bind to element
    body.bindto = '#' + id;
    return 'c3.generate(' + JSON.stringify(body) + ');';
};

function highcharts(id, body) {
    // http://www.highcharts.com/docs/getting-started/your-first-chart
    body.chart = body.chart || {};
    body.chart.renderTo = id;
    return 'new Highcharts.Chart(' + JSON.stringify(body) + ');';
};

var chartFns = Object.freeze({
    c3: c3,
    highcharts: highcharts
});

var FORMAT_YAML = 'yaml';

var CHART_TYPE = ['c3', 'highcharts'];

var ASSETS_SCRIPT_FILES = {
    c3: ['c3/c3.min.css', 'c3/d3.min.js', 'c3/c3.min.js'],
    highcharts: ['highcharts/highcharts.js']
};

var assetsFiles = [];
var chartScriptFn = function chartScriptFn() {};

module.exports = {
    book: {
        assets: './assets',
        html: {
            'head:end': function headEnd(options) {
                return assetsFiles.map(function (f) {
                    return assetsTag(options.staticBase, f);
                }).join('');
            }
        }
    },
    hooks: {
        init: function init() {
            var pluginConfig = (this.options.pluginsConfig || {}).chart || {};
            var type = pluginConfig.type;
            if (CHART_TYPE.indexOf(type) < 0) {
                type = CHART_TYPE[0];
            }
            assetsFiles = ASSETS_SCRIPT_FILES[type];
            chartScriptFn = chartFns[type];
        }
    },
    blocks: {
        chart: {
            process: function process(blk) {
                var id = uuid();
                var body = {};
                try {
                    // get string in {% chart %}
                    var bodyString = blk.body.trim();
                    if (blk.kwargs.format === FORMAT_YAML) {
                        // load yaml into body:
                        body = require('js-yaml').safeLoad(bodyString);
                    } else {
                        // just think it as json:
                        // TODO: Avoiding `eval`
                        // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
                        eval('body=' + bodyString);
                    }
                    console.log(JSON.stringify(body, null, 4));
                } catch (e) {
                    console.error(e);
                }
                var scripts = chartScriptFn(id, body);
                return '<div>\n                    <div id="' + id + '"></div>\n                    <script>' + scripts + '</script>\n                </div>';
            }
        }
    }
};