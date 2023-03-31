import {
  doc,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";

type DocData = WithFieldValue<DocumentData>;

export class FirestoreHandler {
  private firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  private getPathSplit(path: string) {
    return path.split("/").filter((item) => item);
  }

  private getDocumentRef(collectionPath: string, documentId: string) {
    return doc(this.firestore, collectionPath, documentId);
  }

  private getCollectionRef(collectionPath: string) {
    return collection(this.firestore, collectionPath);
  }

  public addDocument(collectionPath: string, data: DocData) {
    const collectionRef = this.getCollectionRef(collectionPath);

    return addDoc(collectionRef, data);
  }

  public setDocument(collectionPath: string, data: DocData) {
    const documentRef = this.getDocumentRef(collectionPath, data.id);

    return setDoc(documentRef, data);
  }

  public updateDocument(collectionPath: string, data: DocData) {
    const documentRef = this.getDocumentRef(collectionPath, data.id);

    return updateDoc(documentRef, data);
  }

  public deleteDocument(collectionPath: string, data: DocData) {
    const documentRef = this.getDocumentRef(collectionPath, data.id);

    return deleteDoc(documentRef);
  }
}
