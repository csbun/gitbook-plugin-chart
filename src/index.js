
import { uuid } from './util';
import * as chartFns from './chart';

const FORMAT_YAML = 'yaml';

let chartScriptFn = () => {};

module.exports = {
    book: {
        assets: './assets',
    },
    hooks: {
        init: function () {
            const { type } = this.config.get('pluginsConfig.chart');
            chartScriptFn = chartFns[type];
        }
    },
    blocks: {
        chart: {
            process: function (blk) {
                const id = uuid();
                let body = '';
                try {
                    // get string in {% chart %}
                    const bodyString = blk.body.trim();
                    if (blk.kwargs.format === FORMAT_YAML) {
                        // load yaml into body:
                        body = JSON.stringify(require('js-yaml').safeLoad(bodyString));
                    } else {
                        // this is pure JSON
                        body = bodyString;
                    }
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
