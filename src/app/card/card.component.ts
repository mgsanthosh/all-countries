import {Component, Input} from '@angular/core';
import Country from "../utils/Country";
import {MatDialog} from "@angular/material/dialog";
import {CountryDetailsComponent} from "./country-details/country-details.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cardData: Country | undefined;

  constructor(private matDialog: MatDialog,
  ) {

  }

  openCountryDetails() {
    const dialogRef = this.matDialog.open(CountryDetailsComponent, {
      hasBackdrop: true,
      disableClose: false,
      width: "500px",
      data: this.cardData,
    });
  }
}
