import { NotificationInstance } from 'antd/es/notification/interface';

import { ApiError } from '@/features/auth/types';

export const showSuccessNotification = (api: NotificationInstance) => {
  api.success({
    message: 'Успешно!',
    description: 'Вы успешно вошли в аккаунт.',
    placement: 'top',
  });
};

export const showErrorNotification = (api: NotificationInstance, error: ApiError) => {
  if (error?.status === 400 && error?.data?.message === 'Invalid credentials') {
    api.error({
      message: 'Неверные учетные данные',
      description: 'Проверьте правильность введенного логина и пароля.',
      placement: 'top',
    });
  } else {
    api.error({
      message: 'Ошибка',
      description: 'Произошла ошибка при попытке входа. Пожалуйста, попробуйте еще раз.',
      placement: 'top',
    });
  }
};
