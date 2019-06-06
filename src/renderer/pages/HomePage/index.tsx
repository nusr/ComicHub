import { Card, Steps, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import CommonFooter from '../../components/CommonFooter';
import CommonHeader from '../../components/CommonHeader';
import { typeConfig } from '../config';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
const { Step } = Steps;

type Props = {
    children: React.ReactChild;
    location: any;
};

function getCurrentStep(type: string): number {
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
        <Layout>
            <Header>
                <CommonHeader />
            </Header>
            <Content>
                <Card>
                    <Steps
                        className={styles.steps}
                        labelPlacement="vertical"
                        current={getCurrentStep(currentType)}
                    >
                        <Step title="搜索漫画" />
                        <Step title="选择章节" />
                        <Step title="下载漫画" />
                        <Step title="下载结果" />
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
