# mjml-chartjs
[![Build Status](https://travis-ci.com/typpo/mjml-chartjs.svg?branch=master)](https://travis-ci.com/typpo/mjml-chartjs)

An MJML component for embedding Chart.js charts in email using the open-source [QuickChart](https://quickchart.io) renderer.

## Usage

This mjml...

```html
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180],
              backgroundColor: 'rgb(75, 192, 192)',
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

Will show this chart:

![MJML rendered chart](https://quickchart.io/chart?v=3&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Users%27%2C%0A%20%20%20%20%20%20data%3A%20%5B50%2C%2060%2C%2070%2C%20180%5D%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27rgb(75%2C%20192%2C%20192)%27%2C%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D%0A)

Customize the background color, width, height, and other parameters using the attributes below.

## Setup

Install via npm:

```
npm install mjml-chartjs --save
```

Then add the package to your `.mjmlconfig`:

```
{
  "packages": [
    "mjml-chartjs/lib/MjChartjs.js"
  ]
}
```

## Attributes

The `<mj-chartjs>` tag supports all the attributes of the `<mj-image>` tag.  View those attributes [here](https://mjml.io/documentation/#mjml-image).

In addition to regular image attributes which you can using for sizing and positioning, the component supports the following QR-specific attributes:

| Name             | Description                                               | Required? | Default       |
|------------------|-----------------------------------------------------------|-----------|---------------|
| chart            | The Chart.js configuration to be rendered                 | Yes       |               |
| width            | The pixel width of the generated chart image              |           | 500px         |
| height           | The pixel height of the generated chart image             |           | 300px         |
| background-color | The background color of the generated chart image         |           | #fff          |
| chartjs-version  | The version of Chart.js renderer to use                   |           | 3             |
| host             | The host of the chart rendering server                    |           | quickchart.io |
| scheme           | The scheme of the chart rendering server                  |           | https         |
| ignore-url-limit | If set, ignore the 16kb URL length guideline              |           | false         |
| api-key          | QuickChart.io API key (optional, for signing requests)    |           |               |
| api-account      | QuickChart.io account ID (optional, for signing requests) |           |               |

## Hosting

By default, this component uses the public [QuickChart](https://quickchart.io) web service to render charts, but you can use the `host` attribute to point to your own chart renderer.

## Limitations

### Large charts

If you have a very large chart config, it may not fit into an image tag!  Browsers and web servers limit the max length of URLs.  This plugin works by fully encoding the chart image into the image URL.

This plugin will throw an error if your URL length exceeds 16kb.  You can override this behavior by setting the `ignore-url-limit` attribute on your `mj-chartjs` tag.

The good news is that you should almost never need to send a URL that long.  If the chart URL is too long, consider the following:
- Is it possible to remove datapoints from the chart?  You probably don't need to show that level of detail.
- Can you reduce the precision of your chart values?  The user probably won't be able to see the difference between 1.0 and 1.000000025

If you decide that you want to send a large data payload anyways, consider pre-registering the charts as [short URLs](https://quickchart.io/documentation/#short-urls) and then sending the shortened URLs in a regular `mj-image` tag.

### No interactivity (animations or tooltips)

This package works by rendering your Chart.js chart as an image.  This means it is not psosible to retain interactive chart features such as animations or tooltips.
