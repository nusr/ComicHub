import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function SearchBox() {
  const searchResult = (value) => {
    console.log(value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={searchResult}
        enterButton
      />
    </div>
  );
}
