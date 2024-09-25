import { useEffect, useState } from 'react';
import { LineChart } from '@/components/LineChart';
import dayjs from 'dayjs';
import { DatePickerValue, RangePicker } from '@/components/RangePicker';
import { parseLocalStorageValue } from '@/utils/localStorage';

const fetchData = async ({ from, to }: { from: string; to: string; }) => {
  const response = await fetch(`/api/weather?from=${from}&to=${to}`, {
    method: 'GET',
  })

  const data = await response.json()
  return data.data;
}

const defaultRange = {
  from: dayjs().subtract(30, 'day'),
  to: dayjs(),
}

const DATES_KEY = 'weather-app-dates';
const DATE_FORMAT = 'YYYY-MM-DD'

export default function WeatherApp() {
  const [data, setData] = useState(null)
  const [range, setRange] = useState<DatePickerValue>([defaultRange.from, defaultRange.to])

  useEffect(() => {
    const persistedRange: { from: string, to: string } = parseLocalStorageValue(DATES_KEY)

    const range = persistedRange ?? {
      from: defaultRange.from.format(DATE_FORMAT),
      to: defaultRange.to.format(DATE_FORMAT),
    };

    setRange([
      dayjs(range.from),
      dayjs(range.to),
    ]);

    fetchData(range).then(setData)
  }, [])

  const handleChangeDates = async (dates: DatePickerValue) => {
    setRange(dates);

    if (!dates || !dates[0] || !dates[1]) return;
    const range = {
      from: dates[0].format(DATE_FORMAT),
      to: dates[1].format(DATE_FORMAT),
    };
    localStorage.setItem(DATES_KEY, JSON.stringify(range));

    const data = await fetchData(range)
    setData(data);
  }

  return (
    <div>
      {data && (
        <LineChart data={data} />
      )}
      <RangePicker value={range} setValue={handleChangeDates} />
    </div>
  )
}
