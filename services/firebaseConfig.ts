import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  /*
  Here goes some sensible, but essential code.
  The exact code that goes here changes based on the firebase project you are making.
  Not having the code here means that some parts of the app won't work.
  To be specific, the data will not be extracted from the database, so you won't be able
  to login, signup, see the tradespeople or the appointments customers made
  */
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)