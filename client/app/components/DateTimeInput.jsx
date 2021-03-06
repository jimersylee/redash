import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular';
import DatePicker from 'antd/lib/date-picker';
import { clientConfig } from '@/services/auth';
import { Moment } from '@/components/proptypes';

export function DateTimeInput({
  value,
  withSeconds,
  onSelect,
  className,
}) {
  const format = (clientConfig.dateFormat || 'YYYY-MM-DD') +
    (withSeconds ? ' HH:mm:ss' : ' HH:mm');
  const additionalAttributes = {};
  if (value && value.isValid()) {
    additionalAttributes.defaultValue = value;
  }
  const currentValueRef = useRef(additionalAttributes.defaultValue);
  return (
    <DatePicker
      className={className}
      showTime
      {...additionalAttributes}
      format={format}
      placeholder="Select Date and Time"
      onChange={(newValue) => { currentValueRef.current = newValue; }}
      onOpenChange={(status) => {
        const currentValue = currentValueRef.current;
        if (!status) { // on close picker
          if (currentValue && currentValue.isValid()) {
            onSelect(currentValue);
          }
        }
      }}
    />
  );
}

DateTimeInput.propTypes = {
  value: Moment,
  withSeconds: PropTypes.bool,
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

DateTimeInput.defaultProps = {
  value: null,
  withSeconds: false,
  onSelect: () => {},
  className: '',
};

export default function init(ngModule) {
  ngModule.component('dateTimeInput', react2angular(DateTimeInput));
}

init.init = true;
