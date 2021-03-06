import Papa from 'papaparse';
import { DATA_URL } from "../config";

let cache = undefined;

/**
 * Compute number of active days in array.
 * @param list
 */
const computeActive = list => {
  const active = [];
  for (let i = 0; i < list.length; ++i) {
    if (list[i] > 0) {
      active[i] = (i > 0 ? active[i-1] : 0) + 1;
    } else {
      active[i] = 0;
    }
  }
  return active;
};

/**
 * calculated using backward difference
 * @param list
 * @returns {*[]}
 */
const calculateDerivative = list => {
  const difference = [list[0]];
  for (let i = 1; i < list.length; ++i) {
    difference[i] = list[i]  - list[i - 1];
  }
  return difference;
};

/**
 * Averaging function
 * @param list of numbers
 * @param exp exponent, between 0 and 1
 */
const exponentialWeightedAverages = (list, exp) => {
  const inv = 1.0 - exp;
  // const window = 1 / inv; // approximation of practical average window

  const average = [list[0]];
  for (let i = 1; i < list.length; ++i) {
    average[i] = exp * average[i - 1] + inv * list[i];
    average[i] = Number(average[i]).toFixed(2)
  }
  return average;
};

/**
 * Get data from all sources and aggregate
 * @returns {Promise<any>}
 */
export const loadCsv = () => {
  const url = DATA_URL;

  const promise = new Promise((resolve, reject) => {
    if (cache) {
      console.log('returning cached data');
      return cache;
    }

    Papa.parse(url, {
      download: true,
      error: function(err, file, inputElem, reason) {
        const message = 'error csv downloader&parser: ' + reason;
        console.error(message);
        reject(message);
      },
      complete: function(results) {
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

        const data = remoteData;
        const fullHeader = remoteHeader;

        const result = {
          fullHeader,
          sites: [],
          dayHeader: fullHeader.slice(4),
        };

        for (let rowIdx = 1; rowIdx < data.length; ++rowIdx) {
          const row = data[rowIdx];
          const count = row.slice(4);
          const derivative = calculateDerivative(count);
          result.sites.push({
            province: row[0],
            region: row[1],
            lat: row[2],
            lng: row[3],
            count: count,
            derivative,
            derivativeA: exponentialWeightedAverages(derivative, 0.1),
            active: computeActive(count),
          });
        }

        cache = result;

        resolve(result);
      }
    });
  });

  return promise;
};
