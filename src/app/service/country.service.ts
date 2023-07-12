import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Country from "../utils/Country";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: Country[] = [];
  countriesDataProvider: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>(this.countries);

  currentIndex: number = 0;
  rowSize: number = 25;

  constructor(private httpClient: HttpClient) { }

  getCountryData() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    this.httpClient.get(apiUrl).subscribe((response) => {
      const listOfCountries = response;
      this.countries = Object.values(response).map((key: any) => ({
        capital: key['capital'],
        name: key['name']['common'],
        continent: key['continents'],
        currency: key['currencies'],
        languages: key['languages'],
        population: key['population'],
        timeZone: key['timezones'],
        flag: key['flags']['png']
      }));
      this.countries = this.countries.sort((a, b) => a.name.localeCompare(b.name));
      this.loadMore('init');
    }, error => {
      console.log('There is an error fetching countries');
    });
  }


  loadMore(type: string) {
    this.rowSize = type === 'init' ? 25 : this.rowSize;
    const endIndex = this.currentIndex + this.rowSize;
    const countriesToDisplay = this.countries.slice(this.currentIndex, endIndex);
    this.rowSize += 5;
    this.countriesDataProvider.next(countriesToDisplay);
  }

  searchForCountries(searchString: string) {
    const apiUrl = 'https://restcountries.com/v3.1/name/' + searchString;
    this.httpClient.get(apiUrl).subscribe((response) => {
      const listOfCountries = response;
      this.countries = Object.values(response).map((key: any) => ({
        capital: key['capital'],
        name: key['name']['common'],
        continent: key['continents'],
        currency: key['currencies'],
        languages: key['languages'],
        population: key['population'],
        timeZone: key['timezones'],
        flag: key['flags']['png']
      }));
      this.countries = this.countries.sort((a, b) => a.name.localeCompare(b.name));
      this.loadMore('init');
    }, error => {
      console.log('There is an error fetching countries');
    });
  }

  get showLoadMoreButton() {
    return this.countries.length > 25;
  }
}
