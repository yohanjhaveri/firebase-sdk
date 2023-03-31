type Suggested<T extends string> = T | Omit<string, T>;

export type OAuthProviderName = Suggested<
  "google" | "facebook" | "twitter" | "github" | "apple" | "microsoft"
>;

export type OAuthMethod = "popup" | "redirect";

export type SignUpPayload = {
  name?: string;
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};
