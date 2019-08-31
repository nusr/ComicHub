import React, { useEffect } from 'react';
import Store from '../../store';

type Props = {}
const Help: React.FunctionComponent<Props> = () => {
  const { toggleLoading } = Store.useContainer();
  useEffect(() => {
    toggleLoading();
  }, []);
  return <div>Help</div>;
};
export default Help;
