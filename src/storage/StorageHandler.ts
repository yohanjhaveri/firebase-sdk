import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export class StorageHandler {
  private storage: FirebaseStorage;

  constructor(storage: FirebaseStorage) {
    this.storage = storage;
  }

  public async listFiles(path: string, file: File) {
    const fileRef = ref(this.storage, path);
    const snapshot = await uploadBytes(fileRef, file);

    return snapshot.ref.fullPath;
  }

  public async uploadFile(path: string, file: File) {
    const fileRef = ref(this.storage, path);
    const snapshot = await uploadBytes(fileRef, file);

    return snapshot.ref.fullPath;
  }

  public async downloadFile(path: string) {
    const fileRef = ref(this.storage, path);
    return getDownloadURL(fileRef);
  }

  public async deleteFile(path: string) {
    const fileRef = ref(this.storage, path);
    return deleteObject(fileRef);
  }
}
