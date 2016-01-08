
import { uuid, assetsTag } from './util';
import * as chartFns from './chart';

const CHART_TYPE = [
    'c3',
    'highcharts'
];

const ASSETS_SCRIPT_FILES = {
    c3: [
        'c3/c3.min.css',
        'c3/d3.min.js',
        'c3/c3.min.js',
    ],
    highcharts: [
        'highcharts/highcharts.js'
    ]
};

let assetsFiles = [];
let chartScriptFn = () => {};

module.exports = {
    book: {
        assets: './assets',
        html: {
            'head:end': function (options) {
                return assetsFiles
                    .map(f => assetsTag(options.staticBase, f))
                    .join('');
            }
        }
    },
    hooks: {
        init: function () {
            let pluginConfig = (this.options.pluginsConfig || {}).chart || {};
            let type = pluginConfig.type;
            if (CHART_TYPE.indexOf(type) < 0) {
                type = CHART_TYPE[0];
            }
            assetsFiles = ASSETS_SCRIPT_FILES[type];
            chartScriptFn = chartFns[type];
        }
    },
    blocks: {
        chart: {
            process: function (blk) {
                let id = uuid();
                let body = {};
                try {
                    // TODO: Avoiding `eval`
                    // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval
                    eval('body=' + blk.body.trim());
                } catch (e) {
                    console.error(e);
                }
                let scripts = chartScriptFn(id, body);
                return `<div>
                    <div id="${id}"></div>
                    <script>${scripts}</script>
                </div>`;
            }
        }
    }
};
