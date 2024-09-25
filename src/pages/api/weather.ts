import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchWeatherApi } from 'openmeteo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const from = req.query.from as string
  const to = req.query.to as string

  const data = await fetchData({ from, to })
  res.status(200).json({ data })
}

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

async function fetchData({ from, to }: {
  from: string;
  to: string;
}) {
  const params = {
    // Tel Aviv coordinates
    "latitude": 32.0809,
    "longitude": 34.7806,
    "start_date": from,
    "end_date": to,
    "daily": ["temperature_2m_max", "temperature_2m_min"],
    "timezone": "GMT"
  };
  const url = "https://historical-forecast-api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const daily = response.daily()!;

  return {
    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
      (t) => new Date((t + utcOffsetSeconds) * 1000)
    ),
    tMax: Array.from(daily.variables(0)!.valuesArray()!),
    tMin: Array.from(daily.variables(1)!.valuesArray()!),
  };
}
