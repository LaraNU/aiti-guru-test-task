import { LogoIcon } from '@/assets/icon/logo';

import styles from './login-form.module.css';

export const LoginFormHeader = () => {
  return (
    <>
      <div className={styles.logo}>
        <LogoIcon />
      </div>
      <div>
        <p className={styles.welcome}>Добро пожаловать!</p>
        <p className={styles.text}>Пожалуйста, авторизируйтесь</p>
      </div>
    </>
  );
};
