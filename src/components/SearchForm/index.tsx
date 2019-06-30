import {
    Button, Checkbox, Form, Input, Select,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-locale';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { IFormData, IOptionData, MenuItem } from '../../type';

const FormItem = Form.Item;

type Props = {
    menuList: MenuItem [];
    form?: any;
    handleFormSubmit: (data: IFormData) => void;
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
            <FormItem label={<FormattedMessage id="component.SearchForm.site.label" />}>
                {form.getFieldDecorator('url', {
                    initialValue: currentData.url,
                    rules: [
                        {
                            required: true,
                            message: <FormattedMessage id="component.SearchForm.site.message" />,
                        },
                    ],
                })(
                    <Select
                        showSearch
                        placeholder={<FormattedMessage id="component.SearchForm.site.message" />}
                        style={{ width: 170 }}
                        filterOption={filterOption}
                    >
                        {menuList.map((item: IOptionData) => (
                            <Select.Option value={item.value} key={item.value}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>,
                )}
            </FormItem>
            <FormItem label={<FormattedMessage id="component.SearchForm.keyword.label" />}>
                {form.getFieldDecorator('name', {
                    initialValue: currentData.name,
                    rules: [
                        {
                            required: true,
                            message: <FormattedMessage id="component.SearchForm.keyword.label" />,
                        },
                    ],
                })(<Input placeholder={formatMessage({ id: 'component.SearchForm.keyword.label' })} />)}
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
                    <FormattedMessage id="component.button.search" />
                </Button>
                <Button onClick={resetForm}>重置</Button>
            </FormItem>
        </Form>
    );
};

export default Form.create({ name: 'SearchForm' })(SearchForm);
