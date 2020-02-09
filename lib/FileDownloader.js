import jsPDF from "jspdf";
import * as docx from "docx";
import FileSaver from "file-saver";
function ConvertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  try {
    var str = "";
    var obj = array[0] ? array[0] : null;
    var res = Object.keys(obj);
  } catch (err) {
    return err;
  }

  res = res.join(",");
  // console.log(res);
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  // console.log(str);
  return res + "\r\n" + str;
}

class FileMaker {
  constructor() {
    this.content = "";
  }
  checker() {
    console.log("called");
  }
  makeJSON(content, outputFileName) {
    this.content = content;
    if (typeof this.content === "string") {
      this.content = JSON.parse(this.content);
    }
    try {
      var uri =
        "data:text/json;charset=utf-8," + JSON.stringify(this.content, 0, 4);
    } catch (err) {
      throw err;
    }

    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    var opFileName = `${outputFileName}.json`;
    // console.log(opFileName);
    downloadLink.download = opFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  makeCSV(content, outputFileName) {
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
    var opFileName = `${outputFileName}.csv`;
    // console.log(opFileName);
    downloadLink.download = opFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  makeSimplePDF(content, outputFileName) {
    this.content = content;

    var doc = new jsPDF();
    var splitTitle;
    if (typeof this.content === "string") {
      splitTitle = doc.splitTextToSize(this.content, 180);
    } else {
      splitTitle = doc.splitTextToSize(JSON.stringify(this.content, 0, 4), 180);
    }

    doc.text(splitTitle, 10, 10);
    var fileName = `${outputFileName}.pdf`;
    doc.save(fileName);
  }

  makeBasicDOCX(content, outputFileName) {
    this.content = content;
    const doc = new docx.Document();
    var data;
    if (typeof this.content === "string") {
      data = this.content;
    } else if (typeof this.content === "object") {
      data = JSON.stringify(this.content, 0, 4);
    } else {
      data = this.content;
    }
    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          children: [new docx.TextRun(data)]
        })
      ]
    });

    docx.Packer.toBlob(doc).then(blob => {
      // console.log(blob);
      var fileName = `${outputFileName}.docx`;
      FileSaver.saveAs(blob, fileName);
      console.log("Document created successfully");
    });
  }

  makeTXT(content, outputFileName) {
    this.content = content;
    var data;
    if (typeof this.content === "string") {
      data = this.content;
    } else if (typeof this.content === "object") {
      data = JSON.stringify(this.content, 0, 4);
    } else {
      data = this.content;
    }
    var uri = "data:text/txt;charset=utf-8," + data;

    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    var opFileName = `${outputFileName}.txt`;
    // console.log(opFileName);
    downloadLink.download = opFileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  makeAdvPdf() {
    var doc = new jsPDF();
    return doc;
  }

  makeAdvDocX() {
    return { docx, FileSaver };
  }
}
let jsFileDownloader = new FileMaker();
export { jsFileDownloader };
