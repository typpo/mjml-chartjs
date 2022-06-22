import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'

import MjChartjs from '../components/MjChartjs'

function toHtml(mjml) {
  const conversion = mjml2html(mjml)
  const { errors } = conversion
  if (errors.length > 0) {
    return errors
  }
  return conversion.html
}

describe('mjml-chartjs', () => {
  beforeAll(() => {
    registerComponent(MjChartjs)
  })

  it('should render the chart', () => {
    const html = toHtml(`
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
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `)
    expect(html).toContain('<img\n         height="300" src="https://quickchart.io')
    expect(html).toContain('&v=3&')
    expect(html).toContain('&w=500&')
    expect(html).toContain('&h=300&')
    expect(html).toContain('&bkg=%23ffffff&')
    expect(html).toContain('&devicePixelRatio=1')
  })

  it('should support background color', () => {
    expect(
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs background-color="#000" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `),
    ).toContain('&bkg=%23000')
  })

  it('should support width and height', () => {
    expect(
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs width="800px" height="400px" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `),
    ).toContain('w=800&h=400')
  })

  it('should support custom chart version', () => {
    expect(
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs chartjs-version="2.9.4" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `),
    ).toContain('&v=2.9.4&')
  })

  it('should support api key and account id', () => {
    expect(
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs api-key="some_key" api-account="123" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `),
    ).toContain(
      '&accountId=123&sig=f75eae4b41e880eb0f5de455911ac6b1c5f73a333b780d647a4cf1f3e691d969',
    )
  })

  it('should support custom host and protocol', () => {
    expect(
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs scheme="http" host="foobar.com" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `),
    ).toContain('<img\n         height="300" src="http://foobar.com')
  })

  it('should error without a chart', () => {
    expect(() => {
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs width="800" height="400" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `)
    }).toThrow()
  })

  it('should error on invalid width/height', () => {
    expect(() => {
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs width="bananas" chart="{
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Users',
              data: [50, 60, 70, 180]
            }]
          }
        }
        " />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `)
    }).toThrow()
  })

  it('should error on a very large chart', () => {
    expect(() => {
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs chart="${'x'.repeat(20000)}" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `)
    }).toThrow()
  })

  it('should ignore large chart error when explicitly told to do so', () => {
    expect(() => {
      toHtml(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-chartjs ignore-url-limit chart="${'x'.repeat(20000)}" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `)
    }).toThrow()
  })
})
