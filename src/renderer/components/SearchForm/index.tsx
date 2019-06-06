import {
    Button, Checkbox, Form, Input, Select,
} from 'antd';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { IFormData, IOptionData } from '../../type';

const FormItem = Form.Item;

type Props = {
    menuList?: any [];
    form?: any;
    handleFormSubmit?: any;
}

const SearchForm: React.FunctionComponent<Props> = ({
    form, menuList = [], handleFormSubmit,
}) => {
    const currentData: IFormData = {
        name: '',
        url: '',
        cache: false,
    };

    function resetForm() {
        form.resetFields();
    }

    useEffect(() => {
        resetForm();
    }, []);

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        form.validateFields((error: Error, fieldsValue: IFormData) => {
            if (error) {
                return;
            }
            if (handleFormSubmit) {
                handleFormSubmit(fieldsValue);
            }
        });
    }

    function filterOption(value: string, record: any) {
        const temp: string = _.get(record, 'props.children');
        if (_.isEmpty(value) || !_.isString(value)) {
            return false;
        }
        return temp.includes(value);
    }

    return (
        <Form onSubmit={handleSubmit} layout="inline">
            <FormItem label="站点">
                {form.getFieldDecorator('url', {
                    initialValue: currentData.url,
                    rules: [
                        {
                            required: true,
                            message: '请选择站点',
                        },
                    ],
                })(
                    <Select showSearch placeholder="请选择状态" style={{ width: 170 }} filterOption={filterOption}>
                        {menuList.map((item: IOptionData) => (
                            <Select.Option value={item.value} key={item.value}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>,
                )}
            </FormItem>
            <FormItem label="关键词">
                {form.getFieldDecorator('name', {
                    initialValue: currentData.name,
                    rules: [
                        {
                            required: true,
                            message: '请输入关键词',
                        },
                    ],
                })(<Input placeholder="请输入关键词" />)}
            </FormItem>
            <FormItem label="MySQL">
                {form.getFieldDecorator('cache', {
                    initialValue: currentData.cache,
                })(<Checkbox />)}
            </FormItem>
            <FormItem>
                <Button
                    onClick={handleSubmit}
                    type="primary"
                    style={{ marginRight: 16 }}
                >
                    搜索
                </Button>
                <Button onClick={resetForm}>重置</Button>
            </FormItem>
        </Form>
    );
};

export default Form.create({ name: 'SearchForm' })(SearchForm);
