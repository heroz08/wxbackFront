import { Form } from 'antd';

function useFormInstance() {
  const [form] = Form.useForm();
  // const { submit, setFieldsValue } = form;
  return form;
}

export default useFormInstance;
