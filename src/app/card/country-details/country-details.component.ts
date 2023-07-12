import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Country from "../../utils/Country";

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Country) {
    console.log("DATA ", data)
  }

  protected readonly Object = Object;
}
