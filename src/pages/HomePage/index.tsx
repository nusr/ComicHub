import { Card, Layout, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'umi-plugin-locale';
import CommonFooter from '../../components/CommonFooter';
import CommonHeader from '../../components/CommonHeader';
import { typeConfig } from '../../utils';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
const { Step } = Steps;

type Props = {
    children: React.ReactChild;
    location: any;
};

export function getCurrentStep(type: string = ''): number {
    switch (type) {
        case typeConfig.search:
            return 0;
        case typeConfig.chapter:
            return 1;
        case typeConfig.download:
            return 2;
        case typeConfig.result:
            return 3;
        default:
            return 0;
    }
}

const HomePage: React.FunctionComponent<Props> = ({
    children,
    location: {
        pathname,
    },
}) => {
    const [currentType, setCurrentType] = useState<string>('');
    useEffect(() => {
        const [, temp] = pathname.split('/');
        setCurrentType(temp);
    }, [pathname]);
    return (
        <Layout className={styles.container}>
            <Header>
                <CommonHeader />
            </Header>
            <Content>
                <Card>
                    <Steps
                        labelPlacement="vertical"
                        current={getCurrentStep(currentType)}
                    >
                        <Step title={<FormattedMessage id="page.HomePage.step0" />} />
                        <Step title={<FormattedMessage id="page.HomePage.step1" />} />
                        <Step title={<FormattedMessage id="page.HomePage.step2" />} />
                        <Step title={<FormattedMessage id="page.HomePage.step3" />} />
                    </Steps>
                </Card>
                <Card>
                    {children}
                </Card>
            </Content>
            <Footer>
                <CommonFooter />
            </Footer>
        </Layout>
    );
};


export default HomePage;
