import {Component, OnInit} from '@angular/core';
import {CountryService} from "./service/country.service";
import Country from "./utils/Country";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'countries';
  countriesToBeDisplayed: Country[] = [];

  constructor(public countryService: CountryService) {
  }

  ngOnInit(): void {
    this.countryService.getCountryData();
    this.countryService.countriesDataProvider.subscribe((countryData) => {
      this.countriesToBeDisplayed = countryData;
    })
  }

  loadMore() {
    this.countryService.loadMore('loadMore');
  }
  searchForCountries(event: any) {
    const searchString = event.target.value;
    if(searchString === '') {
      this.countryService.getCountryData();
    } else {
      this.countryService.searchForCountries(searchString);
    }
  }

  onSearchClick(searchString: string) {
    this.countryService.searchForCountries(searchString);

  }
}
