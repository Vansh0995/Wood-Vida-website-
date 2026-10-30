/* =========================================================
   WOOD VIDA — FIREBASE SETUP (one place for the whole site)
   Every page imports this file, so they all use the SAME
   config. (Before, index.html and account-setting.html had
   slightly different apiKeys, which is why the settings page
   could not see the logged-in user.)
========================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

/* IMPORTANT: copy this block again from
   Firebase console -> Project settings -> General -> Your apps -> SDK setup
   and compare the apiKey letter by letter. */
const firebaseConfig = {
    apiKey: "AIzaSyB9CN3pfy3ZH2pCGBrhHPR_s3ePTOY1BLI",
    authDomain: "wood-vida.firebaseapp.com",
    projectId: "wood-vida",
    storageBucket: "wood-vida.firebasestorage.app",
    messagingSenderId: "259502773353",
    appId: "1:259502773353:web:b05cee9ebf6b2ba097fef8",
    measurementId: "G-5LLERHBPFJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/* Analytics only works on http/https, so check first */
isSupported()
    .then(function (ok) { if (ok) getAnalytics(app); })
    .catch(function () {});