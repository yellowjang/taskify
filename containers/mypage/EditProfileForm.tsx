import { useRouter } from 'next/router';
import { ChangeEvent, FormEventHandler, useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import ImageInput from '@/components/Input/ImageInput';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { postImage } from '@/services/postService';
import Button from '@/components/Button';
import useToast from '@/hooks/useToast';
import styles from './EditProfileForm.module.scss';
import { UpdateProfileForm } from '@/types/UpdateProfileForm.interface';
import { useTheme } from '@/hooks/useThemeContext';

export default function EditProfileForm() {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProfile();
  const { user, loading } = useUserStore((state) => ({
    user: state.user,
    loading: state.loading,
  }));
  const [nickname, setNickname] = useState('');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState<
    string | null
  >(null);
  const [isNicknameValid, setIsNicknameValid] = useState({
    gtZero: true,
    lteTen: true,
  });

  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setCurrentProfileImageUrl(user.profileImageUrl || null);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    setIsNicknameValid({
      gtZero: newNickname.length > 0,
      lteTen: newNickname.length <= 10,
    });
  };

  const handleImageChange = (image: File) => {
    setProfileImageFile(image);

    // 새로운 이미지를 선택하면 미리보기 URL을 생성하여 설정
    const imageUrl = URL.createObjectURL(image);
    setCurrentProfileImageUrl(imageUrl);
  };

  const handleImageDelete = () => {
    setProfileImageFile(null);
    setCurrentProfileImageUrl(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formProfileData = async (): Promise<UpdateProfileForm> => {
      const formData: UpdateProfileForm = {
        nickname: nickname || user.nickname || '',
      };

      if (profileImageFile) {
        const { profileImageUrl } = await postImage({
          image: profileImageFile,
        });
        formData.profileImageUrl = profileImageUrl;
      } else {
        // 이미지가 삭제된 경우 currentProfileImageUrl을 검사하여 null로 설정
        formData.profileImageUrl = currentProfileImageUrl;
      }

      return formData;
    };

    const postData = async () => {
      const formData = await formProfileData();

      mutate(formData, {
        onSuccess: () => {
          toast('success', '프로필이 변경되었습니다.');
        },
        onError: () => {
          toast('error', '프로필 변경에 실패했습니다. 다시 시도해주세요.');
        },
      });
    };

    postData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles['container']} ${styles[theme]}`}>
        <div className={styles['image-box']}>
          <ImageInput
            name='user-profile'
            value={currentProfileImageUrl}
            onChange={handleImageChange}
            onDeleteClick={handleImageDelete}
          />
        </div>
        <div className={styles['form-box']}>
          <div className={styles['email-size']}>
            <label className={styles[`labels`]}>이메일</label>
            <p className={styles['input']}>{user?.email}</p>
          </div>

          <div className={styles['nickname']}>
            <label htmlFor='nickname' className={styles[`labels`]}>
              닉네임
            </label>
            <input
              className={`${styles['input']} ${
                !(isNicknameValid.gtZero && isNicknameValid.lteTen)
                  ? styles.invalid
                  : ''
              }`}
              id='nickname'
              value={nickname}
              placeholder='닉네임을 입력해주세요'
              type='text'
              onChange={handleNicknameChange}
            />
            {!isNicknameValid.gtZero && (
              <p className={styles['nickname-text']}>닉네임을 입력해주세요</p>
            )}
            {!isNicknameValid.lteTen && (
              <p className={styles['nickname-text']}>
                닉네임을 10자 이내로 입력해주세요
              </p>
            )}
          </div>
          <div className={styles['button']}>
            <Button
              buttonType='login'
              disabled={
                isPending || !(isNicknameValid.gtZero && isNicknameValid.lteTen)
              }
            >
              {isPending ? '저장중..' : '저장'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
