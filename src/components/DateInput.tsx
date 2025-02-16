import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

export interface DateInputProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (dateString: string | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, ...rest }) => {
  const dateValue = value ? dayjs(value, 'YYYY-MM-DD') : null;
  //@ts-ignore
  const handleChange = (_, dateString: string | string[]) => {
    if (onChange) {
      if (Array.isArray(dateString)) {
        onChange(dateString[0] || null);
      } else {
        onChange(dateString || null);
      }
    }
  };

  return (
    <DatePicker
      value={dateValue}
      format="YYYY-MM-DD"
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DateInput;
