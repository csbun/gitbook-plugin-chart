# gitbook-plugin-chart

Using [C3.js](http://c3js.org/) or [Highcharts](http://www.highcharts.com/) chart library in Gitbook.

## Config

### Chart Library

Config in `book.json`:

```json
{
    "pluginsConfig": {
        "chart": {
            "type": "highcharts"
        }
    },
}
```

`type` can be `c3` or `highcharts`, default to `c3`.

## Usage

Insert block in your markdown file:

### Example for [C3.js](http://c3js.org/)

```
{% chart %}
{
    // NOT need to specified `bindto` here
    data: {
        type: 'bar',
        columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ],
        axes: {
            data2: 'y2'
        }
    },
    axis: {
        y2: {
            show: true
        }
    }
}
{% endchart %}
```

Getting Start with [C3.js](http://c3js.org/gettingstarted.html#customize).

### Example for [Highcharts](http://www.highcharts.com/)

```
{% chart %}
{
    chart: {
        // NOT need to specified `renderTo` here
        type: 'bar'
    },
    title: {
        text: 'Fruit Consumption'
    },
    xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
        title: {
            text: 'Fruit eaten'
        }
    },
    series: [{
        name: 'Jane',
        data: [1, 0, 4]
    }, {
        name: 'John',
        data: [5, 7, 3]
    }]
}
{% endchart %}
```

Getting Start with [Highcharts](http://www.highcharts.com/docs/getting-started/your-first-chart).

### Example for [YAML](http://yaml.org/)

```
{% chart format="yaml" %}
data:
    type: bar
    columns:
        - [data1, 30, 200, 100, 400, 150, 250]
        - [data2, 50, 20, 10, 40, 15, 25]
    axes:
        data2: y2
axis:
    y2:
        show: true
{% endchart %}
```
