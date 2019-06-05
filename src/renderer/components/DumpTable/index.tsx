/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';
import {
    PaginationConfig,
    SorterResult,
    TableCurrentDataSource,
} from 'antd/lib/table';

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

function initTotalList(columns) {
    const totalList = [];
    columns.forEach(column => {
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
        rowKey: 'id',
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

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        let { needTotalList } = this.state;
        needTotalList = needTotalList.map(item => ({
            ...item,
            total: selectedRows.reduce(
                (sum, val) => sum + parseFloat(val[item.dataIndex]),
                0,
            ),
        }));
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys, needTotalList });
    };
    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
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
            getCheckboxProps: record => ({
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
                                {needTotalList.map(item => (
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
