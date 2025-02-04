import styles from './index.module.scss';
import { modalValues } from '@/constants/ModalConstant';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useTheme } from '@/hooks/useThemeContext';
import classNames from 'classnames';

function SmallModal({
  type,
  handleLeftBtnClick,
  handleRightBtnClick,
  manageDefaultValue,
  onSubmit,
}: {
  type: ModalType;
  handleLeftBtnClick: any; // 타입 any는 나중에 수정 예정
  handleRightBtnClick: any;
  manageDefaultValue?: string;
  onSubmit: (data: any) => void;
}) {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      [modalValues[type].id]: type === 'manage' ? manageDefaultValue : '',
    },
  });

  const { theme } = useTheme();

  return (
    <div className={classNames(styles['modal'], styles[theme])}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <div>
          <p className={styles['title']}>{modalValues[type].title}</p>
        </div>
        <div className={styles['input-wrapper']}>
          <label className={styles['label']} htmlFor={modalValues[type].id}>
            {modalValues[type].label}
          </label>
          <input
            id={modalValues[type].id}
            type='text'
            className={styles['input']}
            placeholder={modalValues[type].placeholder}
            {...register(modalValues[type].id)}
          />
        </div>
        <div className={styles['button-wrapper']}>
          <Button
            buttonType='secondary'
            type='button'
            onClick={handleLeftBtnClick}
          >
            {modalValues[type].leftBtn}
          </Button>

          <Button buttonType='primary'>{modalValues[type].rightBtn}</Button>
        </div>
      </form>
    </div>
  );
}

export default SmallModal;
