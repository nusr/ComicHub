/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

type StandardTableProps = {
    columns: any;
    onSelectRow: (row: any) => void;
    data: any;
    rowKey?: string;
    selectedRows: any[];
    onChange?: any;
    loading?: boolean;
    checkType: string;
}

function initTotalList(columns: any) {
    const totalList: any = [];
    columns.forEach((column: any) => {
        if (column.needTotal) {
            totalList.push({ ...column, total: 0 });
        }
    });
    return totalList;
}

class DumpTable extends Component<StandardTableProps, any> {
    static defaultProps = {
        columns: [],
        data: [],
        rowKey: (item: any) => item.id || item.url,
        onSelectRow: null,
        selectedRows: [],
    };

    constructor(props: StandardTableProps) {
        super(props);
        const { columns } = props;
        const needTotalList = initTotalList(columns);
        this.state = {
            selectedRowKeys: [],
            needTotalList,
        };
    }

    handleRowSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        let { needTotalList } = this.state;
        needTotalList = needTotalList.map((item: any) => ({
            ...item,
            total: selectedRows.reduce(
                (sum: any, val: any) => sum + parseFloat(val[item.dataIndex]),
                0,
            ),
        }));
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys, needTotalList });
    };
    handleTableChange = (pagination: any) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination);
        }
    };
    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    };

    render() {
        const { selectedRowKeys, needTotalList } = this.state;
        const {
            data = {},
            rowKey,
            checkType = 'checkbox',
            ...rest
        } = this.props;
        const rowSelection: any = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: (record: any) => ({
                disabled: record.disabled,
            }),
            type: checkType,
        };

        return (
            <div className={styles.standardTable}>
                <div className={styles.tableAlert}>
                    <Alert
                        message={
                            <Fragment>
                                已选择
                                <a style={{ fontWeight: 600 }}>
                                    {selectedRowKeys.length}
                                </a>
                                项&nbsp;&nbsp;
                                {needTotalList.map((item: any) => (
                                    <span
                                        style={{ marginLeft: 8 }}
                                        key={item.dataIndex}
                                    >
                                        {item.title}
                                        总计&nbsp;
                                        <span style={{ fontWeight: 600 }}>
                                            {item.render
                                                ? item.render(item.total)
                                                : item.total}
                                        </span>
                                    </span>
                                ))}
                                <a
                                    onClick={this.cleanSelectedKeys}
                                    style={{ marginLeft: 24 }}
                                >
                                    清空
                                </a>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    size="small"
                    rowSelection={rowSelection}
                    rowKey={rowKey}
                    dataSource={data}
                    pagination={false}
                    onChange={this.handleTableChange}
                    bordered
                    {...rest}
                />
            </div>
        );
    }
}

export default DumpTable;
