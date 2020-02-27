Basic web application to visualize Corona virus spread over time.


# Design concept
  
* Highlight regions for multiple cases
* Color code infection rate (white to red
* Cured" regions in gray
* Number of cases using dot pattern
* Isolated cases as circle marker

# Data

[Novel Coronavirus (COVID-19) Cases](https://github.com/CSSEGISandData/COVID-19) by JHU CSSE.

Specifically: `csse_covid_19_data/csse_covid_19_time_series/`

## Running app

Install the dependencies.

```bash
npm install
```

Run server

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000).


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


