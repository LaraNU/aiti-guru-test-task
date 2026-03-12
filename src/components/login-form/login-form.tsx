import { Checkbox, Divider, Input, notification } from 'antd';
import { Eye, EyeOff, Lock, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserIcon } from '@/assets/icon/user-icon';
import { useLoginMutation } from '@/features/auth/auth-api';
import { ApiError } from '@/features/auth/types';
import { showErrorNotification } from '@/utils/api-notification';
import { saveAccessToken } from '@/utils/token-storage';

import styles from './login-form.module.css';
import { LoginFormHeader } from './login-form-header';

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [api, contextHolder] = notification.useNotification();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldType>({
    defaultValues: { username: '', password: '', remember: false },
  });

  const onSubmit = async (values: FieldType) => {
    try {
      const { accessToken } = await login({
        username: values.username,
        password: values.password,
      }).unwrap();

      saveAccessToken(accessToken, values.remember);
      navigate('/products');
    } catch (error) {
      const apiError = error as ApiError;
      showErrorNotification(api, apiError);
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.wrapperCard}>
        <div className={styles.card}>
          <LoginFormHeader />

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">
                Логин
              </label>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Пожалуйста, введите ваш логин!' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    prefix={<UserIcon />}
                    suffix={
                      field.value ? (
                        <X
                          color="#C9C9C9"
                          className={styles.clearButton}
                          onClick={() => field.onChange('')}
                        />
                      ) : null
                    }
                  />
                )}
              />
              {errors.username && <div className={styles.error}>{errors.username.message}</div>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Пароль
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Пожалуйста, введите ваш пароль!' }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    id="password"
                    type="password"
                    prefix={<Lock color="#C9C9C9" />}
                    iconRender={(visible) =>
                      visible ? <Eye color="#C9C9C9" /> : <EyeOff color="#C9C9C9" />
                    }
                  />
                )}
              />
              {errors.password && <div className={styles.error}>{errors.password.message}</div>}
            </div>

            <div className={styles.fieldCheckbox}>
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className={styles.checkbox}
                  >
                    Запомнить данные
                  </Checkbox>
                )}
              />
            </div>

            <div className={styles.field}>
              <button type="submit" className={styles.button} disabled={isLoading}>
                Войти
              </button>
            </div>
            <Divider>
              <span className={styles.greyText}>или</span>
            </Divider>
          </form>

          <div>
            <p className={styles.helpText}>
              Нет аккаунта? <span className={styles.link}>Создать</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
