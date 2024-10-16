// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdq-MjryG-HD-8r5Hj_Qsay9d1akdwGnM",
  authDomain: "estate-49326.firebaseapp.com",
  projectId: "estate-49326",
  storageBucket: "estate-49326.appspot.com",
  messagingSenderId: "1011567762120",
  appId: "1:1011567762120:web:ad5a7f39e99a309bafa3fd",
  measurementId: "G-YGLJJGWW2Q"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);