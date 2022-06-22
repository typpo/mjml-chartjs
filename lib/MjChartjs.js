"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _mjmlValidator = require("mjml-validator");

var _mjmlCore = require("mjml-core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _mjmlValidator.registerDependencies)({
  'mj-image-text': [],
  'mj-body': ['mj-chartjs'],
  'mj-section': ['mj-chartjs'],
  'mj-wrapper': ['mj-chartjs'],
  'mj-column': ['mj-chartjs']
});

var MjChartjs = /*#__PURE__*/function (_BodyComponent) {
  _inherits(MjChartjs, _BodyComponent);

  var _super = _createSuper(MjChartjs);

  function MjChartjs() {
    _classCallCheck(this, MjChartjs);

    return _super.apply(this, arguments);
  }

  _createClass(MjChartjs, [{
    key: "getUrl",
    value: function getUrl() {
      var config = this.getAttribute('chart');

      if (!config) {
        throw new Error('You must specify a "chart" attribute for mjml-chartjs');
      }

      var encodedConfig = encodeURIComponent(config);
      var width = Number(this.getAttribute('width').replace('px', ''));
      var height = Number(this.getAttribute('height').replace('px', ''));

      if (Number.isNaN(width) || Number.isNaN(height)) {
        throw new Error('Invalid width/height - please provide a pixel value, e.g. 300px');
      }

      var backgroundColor = encodeURIComponent(this.getAttribute('background-color'));
      var version = this.getAttribute('chartjs-version');
      var ret = "".concat(this.getAttribute('scheme'), "://").concat(this.getAttribute('host'), "/chart?c=").concat(encodedConfig, "&w=").concat(width, "&h=").concat(height, "&bkg=").concat(backgroundColor, "&v=").concat(version, "&devicePixelRatio=1");
      var accountId = this.getAttribute('api-account');
      var apiKey = this.getAttribute('api-key');

      if (accountId && apiKey) {
        var signature = _crypto["default"].createHmac('sha256', apiKey).update(config).digest('hex');

        ret += "&accountId=".concat(accountId, "&sig=").concat(signature);
      }

      if (ret.length > 16000 && !this.getAttribute('ignore-url-limit')) {
        throw new Error('Your chart is potentially too large for all browsers and email clients!  Consult the mjml-chartjs README for help, or add the `ignore-url-limit` attribute to proceed.');
      }

      return ret;
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this = this;

      var attributes = {};
      Object.keys(MjChartjs.allowedAttributes).forEach(function (key) {
        attributes[key] = _this.getAttribute(key);
      });
      attributes.src = this.getUrl();
      return "\n      <mj-image\n        ".concat(this.htmlAttributes(attributes), "\n      >\n      </mj-image>\n    ");
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderMJML(this.renderImage());
    }
  }]);

  return MjChartjs;
}(_mjmlCore.BodyComponent);

exports["default"] = MjChartjs;

_defineProperty(MjChartjs, "endingTag", true);

_defineProperty(MjChartjs, "allowedAttributes", {
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
  usemap: 'string'
});

_defineProperty(MjChartjs, "defaultAttributes", {
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
  'api-account': null
});