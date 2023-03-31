export type SignUpPayload = {
  name?: string;
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};
