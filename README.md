# JS Client File Downloader version: 1.0.7

<p align="center">
  <a href="https://www.npmjs.com/package/js-client-file-downloader"><img src="https://img.shields.io/npm/v/js-client-file-downloader.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/js-client-file-downloader"><img src="https://img.shields.io/npm/l/js-client-file-downloader.svg" alt="License"></a>
</p>

## Introduction

JS Client File Downloader is a simple package to download json, csv, pdf, docx, text files from client side(Browser).

### Browser Compatibility

JS File Downloader supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).

---

### Installing with package manager

With a package manager (**recomanded**):

```js
npm i js-client-file-downloader --save
```

### Basic usage

```js
import { jsFileDownloader } from "js-client-file-downloader";

var json = {
  employee: {
    name: "sonoo",
    salary: 56000,
    married: true
  }
};
var filename = "testing";

//
function onOccuranceOfEvent() {
  jsFileDownloader.makeJSON(obj, filename);
}
```

---

### Methods:

Suppose on Click method we want to initiate download files

```js
//makeCSV() to make cvs file , An array has to be passed in this method as input
//ie , dataToBeDocumented= [{object},{object},{object}] format.
onClick(()=>{
    jsFileDownloader.makeCSV(<dataToBeDocumented>, <testfileName>)
};


//makeJSON() to make json file , An string has to be passed in this method as input
//ie , dataToBeDocumented=  {
//   employee: {
//     name: "sonoo",
//     salary: 56000,
//     married: true
//   }}; format.

onClick(()=>{
    jsFileDownloader.makeJSON(<dataToBeDocumented>, <testfileName>)
};

//makeTXT() to make json file , An string has to be passed in this method as input
//ie , dataToBeDocumented="string ..."; format.

onClick(()=>{
    jsFileDownloader.makeTXT(<dataToBeDocumented>, <testfileName>)
};


//makeTXT() to make json file , A string has to be passed in this method as input
//ie , dataToBeDocumented="string ..."; format.

onClick(()=>{
    jsFileDownloader.makeTXT(<dataToBeDocumented>, <testfileName>)
};


//makeSimplePDF() to make json file , A string has to be passed in this method as input
//ie , dataToBeDocumented="string ..."; format.

onClick(()=>{
    jsFileDownloader.makeSimplePDF(<dataToBeDocumented>, <testfileName>)
};

//makeBasicDOCX() to make json file , A string has to be passed in this method as input
//ie , dataToBeDocumented="string ..."; format.

onClick(()=>{
    jsFileDownloader.makeBasicDOCX(<dataToBeDocumented>, <testfileName>)
};

//for making advance PDF ie with header,picture..etc, use the following method

var pdf=jsFileDownloader.makeAdvPdf() //this method returns a instance of the jsPDF()

//for making advance DOCx ie with header,picture..etc, use the following method

var { docx, FileSaver }=jsFileDownloader.makeAdvDocX() //this method returns a instance of the docx,and fileSaver





```

#### testfileName

output file name

#### dataToBeDocumented

pass the data that you want to create a file.

---

#Author

- Souvik Dey [https://github.com/svkdey]

---

### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present,Souvik Dey

Email : deysouvik955@gmail.com
Github : https://github.com/svkdey
