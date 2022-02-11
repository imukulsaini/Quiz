export type SignInFormValues = {
  email: string;
  password: string;
  autoFill: boolean | string;
};

export type LocationState = {
  from: { prevLocation?: string };
};
