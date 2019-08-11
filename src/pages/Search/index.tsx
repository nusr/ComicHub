import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm';
import { IFormData, MenuItem, TypeConfig } from '../../type';
import { getMenuList as fetchMenuList } from '../../services';
import { history } from '../../utils';

type Props = {}

function getMenuList(data: JsObject = {}): MenuItem[] {
  return Object.keys(data).map(
    (key: string): MenuItem => {
      const item = data[key];
      return {
        name: item.name,
        enabled: item.enabled,
        value: key,
      };
    },
  );
}

const HomePage: React.FunctionComponent<Props> = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetchMenuList().then(data => {
      setMenuList(getMenuList(data));
    });
  }, []);

  function handleSearchSubmit(value: IFormData): void {
    if (value.name && value.url) {
      const link = `/${TypeConfig.chapter}?url=${value.url}&name=${value.name}`;
      history.push(link);
    }
  }

  return <SearchForm handleFormSubmit={handleSearchSubmit} menuList={menuList}/>;

};

export default HomePage;
