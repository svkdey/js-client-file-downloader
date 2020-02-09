"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsFileDownloader = void 0;

var _jspdf = _interopRequireDefault(require("jspdf"));

var docx = _interopRequireWildcard(require("docx"));

var _fileSaver = _interopRequireDefault(require("file-saver"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ConvertToCSV(objArray) {
  var array = _typeof(objArray) != "object" ? JSON.parse(objArray) : objArray;

  try {
    var str = "";
    var obj = array[0] ? array[0] : null;
    var res = Object.keys(obj);
  } catch (err) {
    return err;
  }

  res = res.join(","); // console.log(res);

  for (var i = 0; i < array.length; i++) {
    var line = "";

    for (var index in array[i]) {
      if (line !== "") line += ",";
      line += array[i][index];
    }

    str += line + "\r\n";
  } // console.log(str);


  return res + "\r\n" + str;
}

var FileMaker =
/*#__PURE__*/
function () {
  function FileMaker() {
    _classCallCheck(this, FileMaker);

    this.content = "";
  }

  _createClass(FileMaker, [{
    key: "checker",
    value: function checker() {
      console.log("called");
    }
  }, {
    key: "makeJSON",
    value: function makeJSON(content, outputFileName) {
      this.content = content;

      if (typeof this.content === "string") {
        this.content = JSON.parse(this.content);
      }

      try {
        var uri = "data:text/json;charset=utf-8," + JSON.stringify(this.content, 0, 4);
      } catch (err) {
        throw err;
      }

      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      var opFileName = "".concat(outputFileName, ".json"); // console.log(opFileName);

      downloadLink.download = opFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }, {
    key: "makeCSV",
    value: function makeCSV(content, outputFileName) {
      this.content = content;

      if (typeof this.content === "string") {
        this.content = JSON.parse(this.content);
      }

      try {
        var uri = "data:text/csv;charset=utf-8," + ConvertToCSV(this.content);
      } catch (err) {
        throw err;
      }

      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      var opFileName = "".concat(outputFileName, ".csv"); // console.log(opFileName);

      downloadLink.download = opFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }, {
    key: "makeSimplePDF",
    value: function makeSimplePDF(content, outputFileName) {
      this.content = content;
      var doc = new _jspdf["default"]();
      var splitTitle;

      if (typeof this.content === "string") {
        splitTitle = doc.splitTextToSize(this.content, 180);
      } else {
        splitTitle = doc.splitTextToSize(JSON.stringify(this.content, 0, 4), 180);
      }

      doc.text(splitTitle, 10, 10);
      var fileName = "".concat(outputFileName, ".pdf");
      doc.save(fileName);
    }
  }, {
    key: "makeBasicDOCX",
    value: function makeBasicDOCX(content, outputFileName) {
      this.content = content;
      var doc = new docx.Document();
      var data;

      if (typeof this.content === "string") {
        data = this.content;
      } else if (_typeof(this.content) === "object") {
        data = JSON.stringify(this.content, 0, 4);
      } else {
        data = this.content;
      }

      doc.addSection({
        properties: {},
        children: [new docx.Paragraph({
          children: [new docx.TextRun(data)]
        })]
      });
      docx.Packer.toBlob(doc).then(function (blob) {
        // console.log(blob);
        var fileName = "".concat(outputFileName, ".docx");

        _fileSaver["default"].saveAs(blob, fileName);

        console.log("Document created successfully");
      });
    }
  }, {
    key: "makeTXT",
    value: function makeTXT(content, outputFileName) {
      this.content = content;
      var data;

      if (typeof this.content === "string") {
        data = this.content;
      } else if (_typeof(this.content) === "object") {
        data = JSON.stringify(this.content, 0, 4);
      } else {
        data = this.content;
      }

      var uri = "data:text/txt;charset=utf-8," + data;
      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      var opFileName = "".concat(outputFileName, ".txt"); // console.log(opFileName);

      downloadLink.download = opFileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }, {
    key: "makeAdvPdf",
    value: function makeAdvPdf() {
      var doc = new _jspdf["default"]();
      return doc;
    }
  }, {
    key: "makeAdvDocX",
    value: function makeAdvDocX() {
      return {
        docx: docx,
        FileSaver: _fileSaver["default"]
      };
    }
  }]);

  return FileMaker;
}();

var jsFileDownloader = new FileMaker();
exports.jsFileDownloader = jsFileDownloader;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvertToCSV = ConvertToCSV;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ConvertToCSV(objArray) {
  var array = _typeof(objArray) != "object" ? JSON.parse(objArray) : objArray;

  try {
    var str = "";
    var obj = array[0] ? array[0] : null;
    var res = Object.keys(obj);
  } catch (err) {
    return err;
  }

  res = res.join(","); // console.log(res);

  for (var i = 0; i < array.length; i++) {
    var line = "";

    for (var index in array[i]) {
      if (line !== "") line += ",";
      line += array[i][index];
    }

    str += line + "\r\n";
  } // console.log(str);


  return res + "\r\n" + str;
}
