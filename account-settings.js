/* =========================================================
   WOOD VIDA — ACCOUNT SETTINGS PAGE
   Used by account-setting.html
   (<script type="module" src="account-settings.js"></script>)
========================================================= */

import { app, auth } from "./firebase-init.js";

import {
    onAuthStateChanged,
    updateProfile,
    updatePassword,
    signOut,
    deleteUser,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    EmailAuthProvider,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


const db = getFirestore(app);

const $ = function (id) { return document.getElementById(id); };


/* =========================================================
   ELEMENTS (all already exist in account-setting.html)
========================================================= */

const headerName  = $("settings-user-name");
const headerEmail = $("settings-user-email");
const avatar      = document.querySelector(".profile-avatar");

const nameInput    = $("full-name");
const phoneInput   = $("phone");
const emailInput   = $("email");
const cityInput    = $("city");
const countryInput = $("country");

const saveButton     = document.querySelector("#personal .settings-save");
const passwordInput  = $("new-password");
const passwordButton = document.querySelector("#security .settings-save");
const logoutButton   = $("settings-logout");
const deleteButton   = document.querySelector(".delete-account");

const toggles = document.querySelectorAll("#preferences .toggle");
const PREF_KEYS = ["orderUpdates", "emailNotifications", "offers"];

/* email is shown but cannot be edited here */
if (emailInput) {
    emailInput.readOnly = true;
    emailInput.style.opacity = ".7";
}

let leavingOnPurpose = false;


function userDoc(user) {
    return doc(db, "users", user.uid);
}


/* =========================================================
   SMALL PASSWORD DIALOG (used when Firebase asks to
   confirm your identity again)
========================================================= */

function askPassword(message) {

    return new Promise(function (resolve) {

        const wrap = document.createElement("div");
        wrap.style.cssText =
            "position:fixed;inset:0;z-index:10000;display:flex;align-items:center;" +
            "justify-content:center;padding:20px;background:rgba(10,25,18,.58);";

        const box = document.createElement("div");
        box.style.cssText =
            "width:min(100%,400px);padding:28px;border-radius:14px;background:#f5f0e7;" +
            "color:#17291e;font-family:Arial,Helvetica,sans-serif;";

        const text = document.createElement("p");
        text.textContent = message;
        text.style.cssText = "margin:0 0 16px;font-size:14px;line-height:1.6;";

        const input = document.createElement("input");
        input.type = "password";
        input.placeholder = "Current password";
        input.autocomplete = "current-password";
        input.style.cssText =
            "width:100%;height:48px;padding:0 14px;border:1px solid #cfc8bc;" +
            "background:#faf8f3;font-size:14px;box-sizing:border-box;outline:none;";

        const row = document.createElement("div");
        row.style.cssText = "display:flex;gap:10px;margin-top:18px;justify-content:flex-end;";

        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.textContent = "Cancel";
        cancel.style.cssText =
            "min-height:42px;padding:0 18px;border:1px solid #17291e;background:transparent;" +
            "color:#17291e;font-size:12px;font-weight:700;cursor:pointer;";

        const ok = document.createElement("button");
        ok.type = "button";
        ok.textContent = "Confirm";
        ok.style.cssText =
            "min-height:42px;padding:0 18px;border:1px solid #17291e;background:#17291e;" +
            "color:#f5f0e7;font-size:12px;font-weight:700;cursor:pointer;";

        function finish(value) {
            wrap.remove();
            resolve(value);
        }

        cancel.addEventListener("click", function () { finish(null); });
        ok.addEventListener("click", function () { finish(input.value || null); });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") finish(input.value || null);
            if (event.key === "Escape") finish(null);
        });

        row.append(cancel, ok);
        box.append(text, input, row);
        wrap.appendChild(box);
        document.body.appendChild(wrap);

        input.focus();
    });
}


/* =========================================================
   RE-LOGIN (needed by Firebase before deleting an account
   or changing a password)
   returns true = ok, false = user cancelled
========================================================= */

async function reauthenticate(user) {

    const providers = user.providerData.map(function (p) {
        return p.providerId;
    });

    if (providers.includes("password")) {

        const password = await askPassword(
            "For security, please enter your current password to continue."
        );

        if (!password) return false;

        await reauthenticateWithCredential(
            user,
            EmailAuthProvider.credential(user.email, password)
        );

        return true;
    }

    if (providers.includes("google.com")) {

        await reauthenticateWithPopup(user, new GoogleAuthProvider());

        return true;
    }

    return true;
}


function friendlyError(error) {

    switch (error && error.code) {

        case "auth/invalid-credential":
        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/weak-password":
            return "Password is too weak. Please choose a stronger one.";

        case "auth/too-many-requests":
            return "Too many attempts. Please wait a little and try again.";

        case "auth/network-request-failed":
            return "Network problem. Please check your internet.";

        case "auth/popup-blocked":
            return "Please allow popups for this website.";

        default:
            return "Something went wrong (" + ((error && error.code) || "unknown") + "). Please try again.";
    }
}


/* =========================================================
   SHOW THE USER
========================================================= */

function showUser(user) {

    const name = user.displayName || "Wood Vida Member";

    headerName.textContent  = name;
    headerEmail.textContent = user.email || "";
    avatar.textContent      = name.charAt(0).toUpperCase();

    nameInput.value  = user.displayName || "";
    emailInput.value = user.email || "";
}


/* =========================================================
   LOAD SAVED DETAILS (phone, city, country, preferences)
========================================================= */

async function loadDetails(user) {

    try {

        const snapshot = await getDoc(userDoc(user));
        const data = snapshot.exists() ? snapshot.data() : {};

        phoneInput.value   = data.phone   || "";
        cityInput.value    = data.city    || "";
        countryInput.value = data.country || "India";

        const prefs = data.prefs || {};

        toggles.forEach(function (toggle, index) {
            const key = PREF_KEYS[index];
            if (key && key in prefs) {
                toggle.classList.toggle("active", !!prefs[key]);
            }
        });

    } catch (error) {

        console.warn("Could not load saved details (is Firestore created?):", error);
    }
}


/* =========================================================
   PASSWORD SECTION (Google-only users have no password)
========================================================= */

function setupPasswordSection(user) {

    const hasPassword = user.providerData.some(function (p) {
        return p.providerId === "password";
    });

    if (hasPassword) return;

    const field = passwordInput.closest(".form-field");

    if (field) {
        field.textContent =
            "You signed in with Google, so there is no password to change here.";
        field.style.color = "var(--muted)";
        field.style.fontSize = "12px";
    }

    if (passwordButton) passwordButton.style.display = "none";
}


/* =========================================================
   AUTH STATE
========================================================= */

onAuthStateChanged(auth, async function (user) {

    if (!user) {

        console.log("WOOD VIDA ACCOUNT: nobody logged in");

        window.location.replace(
            leavingOnPurpose ? "index.html" : "index.html?login=1"
        );

        return;
    }

    console.log("WOOD VIDA ACCOUNT: logged in as", user.email);

    showUser(user);
    setupPasswordSection(user);
    await loadDetails(user);
});


/* =========================================================
   SAVE PERSONAL INFORMATION
========================================================= */

saveButton.addEventListener("click", async function () {

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        return;
    }

    const newName = nameInput.value.trim();

    if (!newName) {
        alert("Please enter your name.");
        return;
    }

    saveButton.disabled = true;

    try {

        await updateProfile(user, { displayName: newName });
        showUser(user);

    } catch (error) {

        console.error(error);
        alert("Could not update your name. Please try again.");
        saveButton.disabled = false;
        return;
    }

    try {

        await setDoc(userDoc(user), {
            phone:   phoneInput.value.trim(),
            city:    cityInput.value.trim(),
            country: countryInput.value.trim(),
            updatedAt: serverTimestamp()
        }, { merge: true });

        alert("Your profile has been updated.");

    } catch (error) {

        console.error(error);

        alert(
            "Your name was saved, but phone / city / country could not be saved. " +
            "Please check that Firestore is created and its rules allow logged-in users."
        );

    } finally {

        saveButton.disabled = false;
    }
});


/* =========================================================
   SAVE PREFERENCE TOGGLES
========================================================= */

async function savePreferences() {

    const user = auth.currentUser;
    if (!user) return;

    const prefs = {};

    toggles.forEach(function (toggle, index) {
        prefs[PREF_KEYS[index]] = toggle.classList.contains("active");
    });

    try {
        await setDoc(userDoc(user), { prefs: prefs }, { merge: true });
    } catch (error) {
        console.warn("Could not save preferences:", error);
    }
}

toggles.forEach(function (toggle) {
    toggle.addEventListener("click", savePreferences);
});


/* =========================================================
   CHANGE PASSWORD
========================================================= */

if (passwordButton) {

    passwordButton.addEventListener("click", async function () {

        const user = auth.currentUser;

        if (!user) {
            alert("Please login first.");
            return;
        }

        const newPassword = passwordInput.value;

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        passwordButton.disabled = true;

        try {

            try {

                await updatePassword(user, newPassword);

            } catch (error) {

                if (error.code !== "auth/requires-recent-login") throw error;

                const confirmed = await reauthenticate(user);

                if (!confirmed) return;

                await updatePassword(user, newPassword);
            }

            passwordInput.value = "";
            alert("Your password has been changed.");

        } catch (error) {

            console.error(error);

            if (
                error.code === "auth/popup-closed-by-user" ||
                error.code === "auth/cancelled-popup-request"
            ) {
                return;
            }

            alert(friendlyError(error));

        } finally {

            passwordButton.disabled = false;
        }
    });
}


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener("click", async function () {

    try {

        leavingOnPurpose = true;
        await signOut(auth);

        window.location.href = "index.html";

    } catch (error) {

        leavingOnPurpose = false;
        console.error(error);
        alert("Logout failed. Please try again.");
    }
});


/* =========================================================
   DELETE ACCOUNT
========================================================= */

if (deleteButton) {

    deleteButton.addEventListener("click", async function () {

        const user = auth.currentUser;
        if (!user) return;

        const sure = confirm(
            "Delete your Wood Vida account permanently? This cannot be undone."
        );

        if (!sure) return;

        deleteButton.disabled = true;

        try {

            /* confirm identity first, so nothing is half-deleted */
            const confirmed = await reauthenticate(user);

            if (!confirmed) return;

            try { await deleteDoc(userDoc(user)); } catch (e) {}

            leavingOnPurpose = true;

            await deleteUser(user);

            alert("Your account has been deleted.");
            window.location.href = "index.html";

        } catch (error) {

            leavingOnPurpose = false;

            console.error(error);

            if (
                error.code === "auth/popup-closed-by-user" ||
                error.code === "auth/cancelled-popup-request"
            ) {
                return;
            }

            alert(friendlyError(error));

        } finally {

            deleteButton.disabled = false;
        }
    });
}