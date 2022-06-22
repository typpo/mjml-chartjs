import crypto from 'crypto'

import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  'mj-image-text': [],
  'mj-body': ['mj-chartjs'],
  'mj-section': ['mj-chartjs'],
  'mj-wrapper': ['mj-chartjs'],
  'mj-column': ['mj-chartjs'],
})

export default class MjChartjs extends BodyComponent {
  static endingTag = true

  static allowedAttributes = {
    // Chart API related attributes
    chart: 'string',
    'background-color': 'color',
    width: 'unit(px)',
    height: 'unit(px)',
    'chartjs-version': 'string',
    host: 'string',
    scheme: 'string',
    'ignore-url-limit': 'boolean',
    'api-key': 'string',
    'api-account': 'string',

    // Image attributes
    alt: 'string',
    href: 'string',
    name: 'string',
    src: 'string',
    srcset: 'string',
    title: 'string',
    rel: 'string',
    align: 'enum(left,center,right)',
    border: 'string',
    'border-bottom': 'string',
    'border-left': 'string',
    'border-right': 'string',
    'border-top': 'string',
    'border-radius': 'unit(px,%){1,4}',
    'container-background-color': 'color',
    'fluid-on-mobile': 'boolean',
    padding: 'unit(px,%){1,4}',
    'padding-bottom': 'unit(px,%)',
    'padding-left': 'unit(px,%)',
    'padding-right': 'unit(px,%)',
    'padding-top': 'unit(px,%)',
    target: 'string',
    'max-height': 'unit(px,%)',
    'font-size': 'unit(px)',
    usemap: 'string',
  }

  static defaultAttributes = {
    // Chart API related attributes
    chart: null,
    'background-color': '#fff',
    width: '500px',
    height: '300px',
    'chartjs-version': '3',
    host: 'quickchart.io',
    scheme: 'https',
    'ignore-url-limit': false,
    'api-key': null,
    'api-account': null,
  }

  getUrl() {
    const config = this.getAttribute('chart')
    if (!config) {
      throw new Error('You must specify a "chart" attribute for mjml-chartjs')
    }
    const encodedConfig = encodeURIComponent(config)
    const width = Number(this.getAttribute('width').replace('px', ''))
    const height = Number(this.getAttribute('height').replace('px', ''))
    if (Number.isNaN(width) || Number.isNaN(height)) {
      throw new Error('Invalid width/height - please provide a pixel value, e.g. 300px')
    }
    const backgroundColor = encodeURIComponent(this.getAttribute('background-color'))
    const version = this.getAttribute('chartjs-version')

    let ret = `${this.getAttribute('scheme')}://${this.getAttribute(
      'host',
    )}/chart?c=${encodedConfig}&w=${width}&h=${height}&bkg=${backgroundColor}&v=${version}&devicePixelRatio=1`

    const accountId = this.getAttribute('api-account')
    const apiKey = this.getAttribute('api-key')
    if (accountId && apiKey) {
      const signature = crypto.createHmac('sha256', apiKey).update(config).digest('hex')
      ret += `&accountId=${accountId}&sig=${signature}`
    }

    if (ret.length > 16000 && !this.getAttribute('ignore-url-limit')) {
      throw new Error(
        'Your chart is potentially too large for all browsers and email clients!  Consult the mjml-chartjs README for help, or add the `ignore-url-limit` attribute to proceed.',
      )
    }

    return ret
  }

  renderImage() {
    const attributes = {}
    Object.keys(MjChartjs.allowedAttributes).forEach((key) => {
      attributes[key] = this.getAttribute(key)
    })
    attributes.src = this.getUrl()
    return `
      <mj-image
        ${this.htmlAttributes(attributes)}
      >
      </mj-image>
    `
  }

  render() {
    return this.renderMJML(this.renderImage())
  }
}
