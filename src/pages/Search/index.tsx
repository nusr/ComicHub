import React, { useEffect } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import SearchForm from '../../components/SearchForm';
import { IFormData } from '../../type';
import { typeConfig } from '../config';

type Props = {
    dispatch: any;
    list: any;
};

function getMenuList(data: any = {}) {
    return Object.keys(data).map((key: string) => {
        const item = data[key];
        return {
            value: key,
            name: item.name,
            enabled: item.enabled,
        };
    });
}

const HomePage: React.FunctionComponent<Props> = ({
    dispatch,
    list,
}) => {
    const menuList: any = getMenuList(list);
    useEffect(() => {
        dispatch({
            type: 'menu/fetch',
        });
    }, []);

    function handleSearchSubmit(value: IFormData) {
        if (value.name && value.url) {
            dispatch({
                type: 'shared/changeUrl',
                payload: value.url,
            });
            dispatch({
                type: 'shared/changeParams',
                payload: {
                    name: value.name,
                    noCache: Number(!value.cache),
                },
            });
            router.push(`/${typeConfig.chapter}`);
        }
    }

    // @ts-ignore
    return <SearchForm handleFormSubmit={handleSearchSubmit} menuList={menuList} />;
};
type ConnectProps = {
    loading: any,
    menu: {
        list: any[]
    }
}

export default connect(({ loading, menu }: ConnectProps) => ({
    loading: loading.models.menu,
    list: menu.list,
}))(HomePage);
