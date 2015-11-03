# gitbook-plugin-chart

Using [Chart.js 2.0.0-beta](https://github.com/nnnick/Chart.js/releases/tag/2.0.0-beta) in Gitbook

## Usage

Insert block in your markdown file:

```
{% chart %}
{
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fill: false,
            backgroundColor: "rgba(220,220,220,0.2)",
            borderColor: "rgba(220,220,220,1)",
            pointBorderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(220,220,220,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40],
            yAxisID: "y-axis-1",
        }, {
            label: "My Second dataset",
            fill: false,
            backgroundColor: "rgba(220,220,220,0.2)",
            borderColor: "rgba(220,220,220,1)",
            pointBorderColor: "rgba(220,220,220,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(220,220,220,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    },
}
{% endchart %}
```

See more [Chart.js 2.0.0-beta Usage](https://github.com/nnnick/Chart.js/tree/v2.0-dev/docs).
