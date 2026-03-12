import { Checkbox, Divider, Input } from 'antd';
import { Eye, EyeOff, Lock, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { LogoIcon } from '@/assets/icon/logo';
import { UserIcon } from '@/assets/icon/user-icon';

import styles from './login-form.module.css';

type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldType>({
    defaultValues: { username: '', password: '', remember: false },
  });

  const onSubmit = (values: FieldType) => {
    console.log(values);
  };

  return (
    <div className={styles.wrapperCard}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <div>
          <p className={styles.welcome}>Добро пожаловать!</p>
          <p className={styles.text}>Пожалуйста, авторизируйтесь</p>
        </div>

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
            <button type="submit" className={styles.button}>
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
  );
};
