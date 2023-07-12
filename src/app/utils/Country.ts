export default interface Country {
  capital: string[];
  name: string;
  continent: string[];
  currency: { [key: string]: {} };
  languages: { [key: string]: string };
  population: bigint;
  timeZone: string[];
  flag: string;
}
