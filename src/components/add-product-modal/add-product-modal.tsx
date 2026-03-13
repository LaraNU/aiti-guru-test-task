import { Form, Input, message, Modal } from 'antd';
import { useState } from 'react';

import { ModalThemeProvider } from './modal-theme-provider';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);

      setTimeout(() => {
        console.log('Данные формы:', values);

        message.success('Товар успешно добавлен!');

        setIsSubmitting(false);
        form.resetFields();
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Ошибка валидации:', error);
    }
  };

  return (
    <ModalThemeProvider>
      <Modal
        title="Добавление товара"
        open={isOpen}
        onOk={handleSubmit}
        onCancel={onClose}
        confirmLoading={isSubmitting}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" name="add_product" requiredMark={false}>
          <Form.Item
            name="title"
            label="Наименование"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input placeholder="Например: iPhone 15" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Цена"
            rules={[{ required: true, message: 'Укажите цену' }]}
          >
            <Input placeholder="Цена в ₽" />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Вендор (Бренд)"
            rules={[{ required: true, message: 'Укажите бренд' }]}
          >
            <Input placeholder="Например: Apple" />
          </Form.Item>

          <Form.Item
            name="sku"
            label="Артикул"
            rules={[{ required: true, message: 'Укажите артикул' }]}
          >
            <Input placeholder="Например: A123BC" />
          </Form.Item>
        </Form>
      </Modal>
    </ModalThemeProvider>
  );
};
