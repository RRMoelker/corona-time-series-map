
import Papa from 'papaparse';

let cache = undefined;

const calculateDerivative = (list) => {
  //calculated using backward difference
  const difference = [0];
  for (let i = 1; i < list.length; ++i) {
    difference[i] = list[i]  - list[i - 1];
  }
  return difference;
};

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
        const fullHeader = remoteHeader;

        // const result = {
        //   data,
        //   header: fullHeader
        // };

        const result2 = {
          fullHeader,
          sites: [],
          dayHeader: fullHeader.slice(4),
        };

        for (let rowIdx = 1; rowIdx < data.length; ++rowIdx) {
          const row = data[rowIdx];
          const count = row.slice(4);

          result2.sites.push({
            province: row[0],
            region: row[1],
            lat: row[2],
            lng: row[3],
            count: count,
            derivative: calculateDerivative(count),
          })
        }

        cache = result2;

        resolve(result2);
      }
    });
  });

  return promise;
};
