import { OAuthMethod, OAuthProviderName } from "../types";
import {
  CustomParameters,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  useDeviceLanguage,
  Auth,
} from "firebase/auth";

export class OAuthHandler {
  private auth: Auth;
  private method: OAuthMethod = "redirect";
  private provider: OAuthProvider | null = null;

  constructor(auth: Auth) {
    this.auth = auth;
    return this;
  }

  public getProviderInstance() {
    return this.provider;
  }

  public setProvider(providerName: OAuthProviderName) {
    this.provider = this.createProvider(providerName) as OAuthProvider;
    return this;
  }

  public setScopes(scopes: string[]) {
    scopes.forEach((scope) => {
      if (!this.provider) {
        throw new Error("No provider selected");
      }

      this.provider.addScope(scope);
    });
    return this;
  }

  public setMethod(method: OAuthMethod) {
    if (!this.provider) {
      throw new Error("No provider selected");
    }

    this.method = method;
    return this;
  }

  public setLanguageCode(languageCode: string) {
    if (languageCode) {
      this.auth.languageCode = languageCode;
    } else {
      useDeviceLanguage(this.auth);
    }
    return this;
  }

  public setOptions(customParameters: CustomParameters) {
    if (!this.provider) {
      throw new Error("No provider selected");
    }

    this.provider.setCustomParameters(customParameters);
    return this;
  }

  public async signIn() {
    if (!this.provider) {
      throw new Error("No provider selected");
    }

    const signInUsingMethod = {
      popup: signInWithPopup,
      redirect: signInWithRedirect,
    }[this.method];

    return signInUsingMethod(this.auth, this.provider);
  }

  public async signOut() {
    return signOut(this.auth);
  }

  private createProvider(provider: OAuthProviderName) {
    switch (provider) {
      case "google":
        return new GoogleAuthProvider();
      case "facebook":
        return new FacebookAuthProvider();
      case "twitter":
        return new TwitterAuthProvider();
      case "github":
        return new GithubAuthProvider();
      case "apple":
        return new OAuthProvider("apple.com");
      case "microsoft":
        return new OAuthProvider("microsoft.com");
      default:
        return new OAuthProvider(provider as string);
    }
  }
}
