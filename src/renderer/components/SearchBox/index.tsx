import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';

interface IFormData {
  type: string;
  name: string;
}

interface IOptionData {
  value: string | number;
  label: string;
}

const FormItem = Form.Item;

function PastApplyEdit(props) {
  const { form } = props;
  const currentData: IFormData = {
    name: '',
    type: '',
  };
  const siteList = [];

  function resetForm() {
    form.resetFields();
  }

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      console.log(fieldsValue);
    });
  }

  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <FormItem label="站点">
        {form.getFieldDecorator('type', {
          initialValue: currentData.type,
          rules: [{ required: true, message: '请选择站点' }],
        })(
          <Select placeholder="请选择状态" style={{ width: 170 }}>
            {siteList.map((item: IOptionData) => (
              <Select.Option value={item.value} key={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem label="关键词">
        {form.getFieldDecorator('name', {
          initialValue: currentData.name,
          rules: [{ required: true, message: '请输入关键词' }],
        })(<Input placeholder="请输入关键词" />)}
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
}

const wrapperForm = Form.create({ name: 'PastApplyEdit' })(PastApplyEdit);

export default wrapperForm;
