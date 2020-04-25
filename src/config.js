// Unedited for of https://github.com/CSSEGISandData/COVID-19
// Fork is kept up to date with main repo and also performs some coarse checks if the data is the same structure.
// This is to prevent the app to stop working from a data update outside this apps control.
// Serving through Netlify for CDN benefits

const fileName = 'time_series_19-covid-Confirmed.csv';
let dataUrl;
if (location && location.hostname === "localhost" || location && location.hostname === "127.0.0.1") {
  dataUrl = `https://johns-hopkins-covid19-dataset-educational-fork.netlify.app/${fileName}`;
} else {
  dataUrl = `/data/${fileName}`;
}

export const DATA_URL = dataUrl;
