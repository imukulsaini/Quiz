import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore/lite";
import {
  AddQuizScore,
  FireBaseErrorMessage,
  GetQuizNames,
  QuizQuestions,
  UserQuizScore,
} from "./types/firebase.types";
import { checkFirebaseError } from "./utils/firebase.utils";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,

  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export async function signInUserWithCredentials(
  email: string,
  password: string
): Promise<FirebaseUser | FireBaseErrorMessage> {
  try {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    return userData.user;
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function updateUserProfile(displayName: string): Promise<void> {
  return await updateProfile(auth.currentUser as FirebaseUser, {
    displayName: displayName,
  });
}

export async function addNewUserInStore(userID: string): Promise<void> {
  return await setDoc(doc(db, "users", `${userID}/quizScore`), {
    score: null,
    playTime: null,
    quizName: null,
    quizID: null,
  });
}

export async function createNewUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<FirebaseUser | FireBaseErrorMessage> {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const displayName = `${firstName} ${lastName}`;
    await updateUserProfile(displayName);
    await addNewUserInStore(userCredentials.user.uid);
    return userCredentials.user;
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function logoutUser(): Promise<void | FireBaseErrorMessage> {
  try {
    await signOut(auth);
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function updateUserPassword(
  oldPassword: string,
  newPassword: string
): Promise<FireBaseErrorMessage | void> {
  try {
    const userEmail = auth.currentUser?.email as string;
    const authUser = auth.currentUser as FirebaseUser;
    const emailReAuthCredentials = EmailAuthProvider.credential(
      userEmail,
      oldPassword
    );
    await reauthenticateWithCredential(authUser, emailReAuthCredentials);
    await updatePassword(authUser, newPassword);
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function updateUserEmail(email: string) {
  return await updateEmail(auth.currentUser as FirebaseUser, email);
}

export async function updateProfileData(
  displayName: string,
  email: string
): Promise<FireBaseErrorMessage | void> {
  try {
    await updateUserEmail(email);
    await updateUserProfile(displayName);
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function getQuizNames(): Promise<
  GetQuizNames[] | FireBaseErrorMessage
> {
  try {
    const quizSnapShot = await getDocs(collection(db, "quiz"));
    const getAllQuizNames = quizSnapShot.docs.map((doc) => {
      return { uid: doc.id, ...doc.data() };
    });

    return getAllQuizNames as GetQuizNames[];
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function getQuizQuestions(
  quizID: string
): Promise<QuizQuestions[] | FireBaseErrorMessage> {
  try {
    const quizQuestionSnap = await getDocs(
      collection(db, `quiz/${quizID}/questionsBank`)
    );
    const getAllQuestions = await quizQuestionSnap.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    return getAllQuestions as QuizQuestions[];
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function getUserScore(
  userID: string
): Promise<UserQuizScore[] | FireBaseErrorMessage> {
  try {
    const userScoreSnap = await getDocs(
      collection(db, `users/${userID}/quizScore`)
    );
    const getAllUserScore = userScoreSnap.docs.map((doc, index) => {
      return { slNo: index, uid: doc.id, ...doc.data() };
    });
    return getAllUserScore as UserQuizScore[];
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}

export async function addQuizScore({
  userID,
  score,
  quizName,
}: AddQuizScore): Promise<void | FireBaseErrorMessage> {
  try {
    await addDoc(collection(db, `users/${userID}/quizScore`), {
      score,
      playTime: serverTimestamp(),
      quizName,
    });
  } catch (error: any) {
    const message = checkFirebaseError(error);
    return message;
  }
}
