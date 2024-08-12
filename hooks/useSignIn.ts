// src/hooks/useSignIn.ts
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types/User.interface';
import { SignInError } from './SignInError';
import axios from 'axios';

interface SignInResponse {
  user: {
    nickname: string;
    id: number;
    email: string;
    profileImageUrl?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
  accessToken: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const signIn = async (
  credentials: SignInCredentials,
): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      'https://sp-taskify-api.vercel.app/7-6/auth/login',
      credentials,
    );
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new SignInError(
        error.response?.data?.message || '로그인 실패',
        error.response,
      );
    } else {
      throw new SignInError('네트워크 오류 또는 알 수 없는 오류 발생');
    }
  }
};

export const useSignIn = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const setError = useUserStore((state) => state.setError);

  return useMutation<SignInResponse, SignInError, SignInCredentials>({
    mutationFn: signIn,
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      const user: User = {
        ...data.user,
        createdAt: data.user.createdAt || '',
        updatedAt: data.user.updatedAt || '',
      };
      document.cookie = `token=${data.accessToken}`;
      setUser(user, data.accessToken);
      setLoading(false);
    },
    onError: (error: SignInError) => {
      setError(error.message);
      setLoading(false);
    },
  });
};
