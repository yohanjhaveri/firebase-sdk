import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { SignInPayload, SignUpPayload } from "../types";

export class AuthHandler {
  private auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  public getUser() {
    return this.auth.currentUser;
  }

  public async signUp(data: SignUpPayload) {
    const cred = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    const user = cred.user;

    await sendEmailVerification(user);

    if (data.name) {
      await updateProfile(user, { displayName: data.name });
    }

    return user;
  }

  public async signIn(data: SignInPayload) {
    const cred = await signInWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    return cred.user;
  }

  public async deleteUser() {
    const user = this.getUser();

    if (!user) {
      throw new Error("No user signed in");
    }

    await deleteUser(user);
  }

  public async signOut() {
    return signOut(this.auth);
  }
}
