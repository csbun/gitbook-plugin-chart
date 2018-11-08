export function c3 (id, bodyString) {
    // bind to element
    // body.bindto = '#' + id;
    bodyString = bodyString.replace(/^\{/, `{"bindto":"#${id}",`);
    return `c3.generate(${bodyString});`;
};

export function highcharts (id, bodyString) {
    try {
        const body = JSON.parse(bodyString);
        // http://www.highcharts.com/docs/getting-started/your-first-chart
        body.chart = body.chart || {};
        body.chart.renderTo = id;
        return `new Highcharts.Chart(${JSON.stringify(body)});`;
    } catch (e) {
        console.error(e);
    }
};
