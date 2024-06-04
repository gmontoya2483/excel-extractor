import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as xls from 'xlsx';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'excel_extractor';
  users:any[] = [];

  readExcelFile(e: any) {
    const file = e.target.files[0];

    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = () => {
      const data = fr.result;
      const workbook = xls.read(data, {type:'array'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      this.users = xls.utils.sheet_to_json(sheet, {raw: true});
    }

  }
}
