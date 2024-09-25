import { FC } from 'react';
import styles from './RangePicker.module.css';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';

export type PickerDate = dayjs.Dayjs | null;
export type DatePickerValue = [PickerDate, PickerDate] | null;

type RangePickerProps = {
  value: DatePickerValue;
  setValue: (value: DatePickerValue) => void;
}

const maxDate = dayjs()

export const RangePicker: FC<RangePickerProps> = ({ value, setValue }) => {
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={5}>
        Select date range
      </Typography.Title>
      <DatePicker.RangePicker
        maxDate={maxDate}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
