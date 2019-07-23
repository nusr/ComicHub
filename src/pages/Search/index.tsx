import React, { useEffect } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import SearchForm from '../../components/SearchForm';
import { IFormData, MenuItem, TypeConfig } from '../../type';

type Props = {
    dispatch: any;
    list: any;
};

function getMenuList(data: any = {}): MenuItem[] {
    return Object.keys(data).map((key: string): MenuItem => {
        const item = data[key];
        return {
            name: item.name,
            enabled: item.enabled,
            value: key,
        };
    });
}

const HomePage: React.FunctionComponent<Props> = ({
    dispatch,
    list,
}) => {
    const menuList: MenuItem[] = getMenuList(list);
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
            router.push(`/${TypeConfig.chapter}`);
        }
    }

    // @ts-ignore
    return <SearchForm handleFormSubmit={handleSearchSubmit} menuList={menuList} />;
};
type ConnectProps = {
    loading: any;
    menu: {
        list: any[];
    };
}

export default connect(({ loading, menu }: ConnectProps) => ({
    loading: loading.models.menu,
    list: menu.list,
}))(HomePage);
