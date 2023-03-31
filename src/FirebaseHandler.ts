import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";

import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

import { AuthHandler } from "./auth/AuthHandler";
import { FirestoreHandler } from "./firestore/FirestoreHandler";
import { StorageHandler } from "./storage/StorageHandler";

type Services = {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
};

type Handlers = {
  auth: AuthHandler;
  firestore: FirestoreHandler;
  storage: StorageHandler;
};

export class FirebaseHandler {
  private app: FirebaseApp;
  private services: Services;
  private handlers: Handlers;

  constructor(config: FirebaseOptions) {
    this.app = initializeApp(config);

    this.services = {
      auth: getAuth(this.app),
      firestore: getFirestore(this.app),
      storage: getStorage(this.app),
    };

    this.handlers = {
      auth: new AuthHandler(this.services.auth),
      firestore: new FirestoreHandler(this.services.firestore),
      storage: new StorageHandler(this.services.storage),
    };
  }

  getApp() {
    return this.app;
  }

  getAuthService() {
    return this.services.auth;
  }

  getFirestoreService() {
    return this.services.firestore;
  }

  getStorageService() {
    return this.services.storage;
  }

  getAuthHandler() {
    return this.handlers.auth;
  }

  getFirestoreHandler() {
    return this.handlers.firestore;
  }

  getStorageHandler() {
    return this.handlers.storage;
  }
}
