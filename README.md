## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/chart](http://localhost:3000) with your browser to see the result.

### Libraries used

- `ant` to bring date picker component
- `highcharts` to render chart
- `dayjs` to parse and format dates

Implemented persisting selected dates to localStorage, so after page reload user can see their last input.
Backend part is implemented via nextJS api action, see `src/pages/api/weather.ts`.
Created a component for chart and date picker, see `src/components/*`.

