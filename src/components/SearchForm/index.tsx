import { Button, Form, Input, Select } from 'antd';
import { getLanguageData } from '../../locales';
import React, { useEffect } from 'react';
import { IFormData, IOptionData, MenuItem } from '../../type';

const FormItem = Form.Item;

interface Props {
  menuList: MenuItem[];
  form: JsObject;
  handleFormSubmit: (data: IFormData) => void;
}

const SearchForm: React.FunctionComponent<Props> = ({
  form,
  menuList = [],
  handleFormSubmit,
}) => {
  const currentData: IFormData = {
    name: '',
    url: '',
  };

  function resetForm(): void {
    form.resetFields();
  }

  useEffect(() => {
    resetForm();
  }, []);

  function handleSubmit(event: React.SyntheticEvent): void {
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

  function filterOption(value: string, record: JsObject): boolean {
    if (!value) {
      return false;
    }
    const temp: string = record.props.children;
    return temp.includes(value);
  }

  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <FormItem label={getLanguageData('component.SearchForm.site.label')}>
        {form.getFieldDecorator('url', {
          initialValue: currentData.url,
          rules: [
            {
              required: true,
              message: getLanguageData('component.SearchForm.site.message'),
            },
          ],
        })(
          <Select
            showSearch
            placeholder={getLanguageData('component.SearchForm.site.message')}
            style={{ width: 170 }}
            filterOption={filterOption}
          >
            {menuList.map((item: IOptionData) => (
              <Select.Option
                value={item.value}
                key={item.value}
                disabled={!item.enabled}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem label={getLanguageData('component.SearchForm.keyword.label')}>
        {form.getFieldDecorator('name', {
          initialValue: currentData.name,
          rules: [
            {
              required: true,
              message: getLanguageData('component.SearchForm.keyword.label'),
            },
          ],
        })(
          <Input
            placeholder={getLanguageData('component.SearchForm.keyword.label')}
          />
        )}
      </FormItem>
      <FormItem label="">
        <Button
          onClick={handleSubmit}
          type="primary"
          style={{ marginRight: 16 }}
        >
          {getLanguageData('component.button.search')}
        </Button>
        <Button onClick={resetForm}>
          {getLanguageData('component.SearchForm.reset')}
        </Button>
      </FormItem>
    </Form>
  );
};
const FormWrapper: any = Form.create({ name: 'SearchForm' })(SearchForm);
export default FormWrapper;
