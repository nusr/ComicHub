import React from 'react';
import { Select } from 'antd';
export default function MenuTree() {
  const list = [];
  return (
    <Select>
      {list.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
}
