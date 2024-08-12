// src/hooks/SignInError.ts
export class SignInError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };

  constructor(message: string, response?: any) {
    super(message);
    this.name = 'SignInError';
    this.response = response;
  }
}
