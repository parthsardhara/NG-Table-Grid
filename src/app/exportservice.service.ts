import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // using import * as XLSX from 'xlsx'; package
  // [  
  // "file-saver": "^2.0.2",
  // "xlsx": "^0.14.3",
  // import * as FileSaver from 'file-saver';
  // import * as XLSX from 'xlsx';

  // fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // fileExtension = '.xlsx';
  // public exportExcel(jsonData: any[], fileName: string): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  //   const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   this.saveExcelFile(excelBuffer, fileName);
  // }

  // private saveExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {type: this.fileType});
  //   FileSaver.saveAs(data, fileName + this.fileExtension);
  // }
  // ]

  generateCSVService(jsonData, fileName) {
    this.downloadFile(this.generateCSV(jsonData), this.createFilename(fileName));
  }


  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  generateCSV(jsonData): any {
    const columns = [
      'id',
      'name',
      'flag',
      'area',
      'population',
    ];

    const titles = [
      'Id',
      'Name',
      'Flag',
      'Area',
      'Population',
    ];

    let csv = this.toCSV(jsonData, columns, titles);
    return csv;
  }

  createFilename(productionDate): string {
    let filename = productionDate;
    filename += '.csv';

    return filename;
  }

  toCSV(items, columns, header = null) {
    const replacer = (key, value) => value === null ? '' : value;

    if (!columns) {
      columns = Object.keys(items[0]);
    }

    let csv = items.map(
      row => columns.map(
        fieldName => JSON.stringify(row[fieldName], replacer),
      ).join(','));

    if (!header) {
      header = columns;
    }

    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    return csv;
  }
}
