
import Papa from 'papaparse';

let cache = undefined;

export const loadCsv = () => {
  // get data from all sources
  // aggregate

  const url = 'http://localhost:8080/time_series_19-covid-Confirmed.csv';

  const promise = new Promise((resolve, reject) => {
    if (cache) {
      console.log('returning cached data');
      return cache;
    }

    Papa.parse(url, {
      download: true,
      complete: function(results) {
        console.log(results);

        const remoteData = results.data;

        /**
         * data columns:
         * 0: "Province/State"
         * 1: "Country/Region"
         * 2: "Lat"
         * 3: "Long"
         * 4..: counts per day
         */
        const remoteHeader = remoteData[0];
        console.log('remoteHeader: ', remoteHeader);

        const data = remoteData;
        const header = remoteHeader;

        const result = {
          data,
          header
        };
        cache = result;

        resolve(result);
      }
    });
  });

  return promise;
};
