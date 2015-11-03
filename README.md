# gitbook-plugin-chart

Using [C3.js](http://c3js.org/) chart library in Gitbook

## Usage

Insert block in your markdown file:

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
