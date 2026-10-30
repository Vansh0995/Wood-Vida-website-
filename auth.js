/* =========================================================
   WOOD VIDA — ACCOUNT SYSTEM FOR EVERY PAGE
   Add this ONE line before </body> on every page:
   <script type="module" src="auth.js"></script>

   What it does:
   - builds the login popup + account drawer if the page
     does not already have them (so every page works)
   - email login / sign up / Continue with Google / logout
   - Account button: popup when logged out, drawer when logged in
   - first-visit popup (only once)
   - light / dark theme buttons in the drawer
   - cart number in the navbar
========================================================= */

import { auth } from "./firebase-init.js";

import {
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const $ = function (id) { return document.getElementById(id); };

const SEEN_KEY = "woodVidaWelcomeSeen";
const CART_KEY = "woodVidaCart";
const THEME_KEY = "woodVidaTheme";

function storeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

function storeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
}


/* =========================================================
   POPUP + DRAWER HTML
   (used only on pages that do not already contain it)
========================================================= */

const ACCOUNT_UI = `
<div class="account-overlay" id="account-overlay"></div>

<aside class="account-drawer" id="account-drawer">

    <div class="account-drawer-header">
        <div>
            <div class="account-drawer-eyebrow">WOOD VIDA</div>
            <h2>Account</h2>
        </div>
        <button type="button" class="account-drawer-close" id="account-drawer-close" aria-label="Close account menu">×</button>
    </div>

    <div class="account-user">
        <div class="account-avatar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4.5 21c.8-4.2 3.5-6.5 7.5-6.5s6.7 2.3 7.5 6.5"></path>
            </svg>
        </div>
        <div class="account-user-info">
            <span class="account-welcome">Welcome to Wood Vida</span>
            <strong id="account-user-name">Guest</strong>
            <span id="account-user-email">Sign in to access your account</span>
        </div>
    </div>

    <nav class="account-drawer-menu">

        <a href="account-setting.html" class="account-menu-item" id="account-setting-link">
            <span>Account Settings</span>
            <span class="account-menu-arrow">→</span>
        </a>

        <a href="account-setting.html#addresses" class="account-menu-item">
            <span>Saved Address</span>
            <span class="account-menu-arrow">→</span>
        </a>

        <div class="account-menu-item account-theme-row">
            <span>Appearance</span>
            <div class="theme-switcher">
                <button type="button" class="theme-option active" id="light-theme-btn">Light</button>
                <button type="button" class="theme-option" id="dark-theme-btn">Dark</button>
            </div>
        </div>

        <a href="cart.html" class="account-menu-item">
            <span>Cart</span>
            <span class="account-menu-arrow">→</span>
        </a>

    </nav>

    <div class="account-drawer-contact">
        <a href="https://wa.me/917309990055" target="_blank" rel="noopener noreferrer" class="account-whatsapp">
            <span>Inquiry on WhatsApp</span>
            <span>↗</span>
        </a>
    </div>

    <div class="account-drawer-footer">
        <button type="button" id="account-login-action" class="account-login-action">Login / Sign Up</button>
        <button type="button" id="account-logout" class="account-logout">Logout</button>
    </div>

</aside>


<div class="login-modal" id="login-modal">

    <div class="login-box">

        <button class="login-close" id="login-close" type="button">×</button>

        <div class="login-header">
            <div class="eyebrow">WELCOME TO WOOD VIDA</div>
            <h2 id="login-title">Welcome Back!</h2>
            <p id="login-subtitle">Login to continue your WOOD VIDA journey.</p>
        </div>

        <form id="login-form" class="login-form">

            <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" placeholder="Enter your password" required>
            </div>

            <div class="login-options">
                <label class="remember-me">
                    <input type="checkbox" id="remember-me">
                    <span>Remember me</span>
                </label>
                <a href="#" id="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="button login-submit">Log In</button>

            <div class="login-divider"><span>Or</span></div>

            <button type="button" class="google-login" id="google-login">
                <span class="google-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26z"/>
                        <path fill="#34A853" d="M12 21.8c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.8z"/>
                        <path fill="#FBBC05" d="M6.54 13.88a5.86 5.86 0 0 1 0-3.76V7.59H3.3a9.76 9.76 0 0 0 0 8.82l3.24-2.53z"/>
                        <path fill="#EA4335" d="M12 6.09c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.13 14.63 2.2 12 2.2a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C7.31 7.81 9.46 6.09 12 6.09z"/>
                    </svg>
                </span>
                <span>Continue with Google</span>
            </button>

        </form>

        <form id="signup-form" class="login-form" style="display: none;">

            <div class="form-group">
                <label for="signup-name">Full Name</label>
                <input type="text" id="signup-name" placeholder="Your full name" required>
            </div>

            <div class="form-group">
                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" placeholder="Your email" required>
            </div>

            <div class="form-group">
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" placeholder="Create a password" required>
            </div>

            <button type="submit" class="button login-submit">Create Account</button>

        </form>

        <div class="login-switch">
            <span id="login-switch-text">Don't have an account?</span>
            <button type="button" id="switch-login">Create Account</button>
        </div>

    </div>

</div>
`;

if (!$("login-modal") && !$("account-drawer")) {
    document.body.insertAdjacentHTML("beforeend", ACCOUNT_UI);
}


/* =========================================================
   ELEMENTS
========================================================= */

const accountButton = $("login-button");
const accountLabel  = accountButton ? accountButton.querySelector("span:last-child") : null;

const drawer        = $("account-drawer");
const overlay       = $("account-overlay");
const drawerClose   = $("account-drawer-close");
const drawerName    = $("account-user-name");
const drawerEmail   = $("account-user-email");
const drawerAvatar  = document.querySelector(".account-avatar");
const drawerLogin   = $("account-login-action");
const drawerLogout  = $("account-logout");
const settingsLink  = $("account-setting-link");

const modal         = $("login-modal");
const modalClose    = $("login-close");
const loginForm     = $("login-form");
const signupForm    = $("signup-form");
const switchButton  = $("switch-login");
const switchText    = $("login-switch-text");
const loginTitle    = $("login-title");
const loginSubtitle = $("login-subtitle");
const rememberMe    = $("remember-me");
const forgotLink    = $("forgot-password");

const lightButton   = $("light-theme-btn");
const darkButton    = $("dark-theme-btn");

const defaultAvatarHTML = drawerAvatar ? drawerAvatar.innerHTML : "";

/* "Remember me" ticked by default so people stay logged in */
if (rememberMe) rememberMe.checked = true;

/* sign-up form also gets the Google button (copied from login form) */
(function ensureSignupGoogle() {

    if (!loginForm || !signupForm) return;
    if (signupForm.querySelector(".google-login")) return;

    const divider = loginForm.querySelector(".login-divider");
    const source  = loginForm.querySelector(".google-login");

    if (!divider || !source) return;

    const dividerCopy = divider.cloneNode(true);
    const buttonCopy  = source.cloneNode(true);

    buttonCopy.removeAttribute("id");

    signupForm.appendChild(dividerCopy);
    signupForm.appendChild(buttonCopy);
})();


/* =========================================================
   THEME (light / dark)
========================================================= */

function applyTheme(theme) {

    const dark = theme === "dark";

    document.body.classList.toggle("dark-theme", dark);

    if (lightButton) lightButton.classList.toggle("active", !dark);
    if (darkButton)  darkButton.classList.toggle("active", dark);

    storeSet(THEME_KEY, dark ? "dark" : "light");
}

applyTheme(storeGet(THEME_KEY) === "dark" ? "dark" : "light");

if (lightButton) lightButton.addEventListener("click", function () { applyTheme("light"); });
if (darkButton)  darkButton.addEventListener("click", function () { applyTheme("dark"); });


/* =========================================================
   CART NUMBER IN NAVBAR
========================================================= */

function updateCartCount() {

    const counter = $("cart-count");
    if (!counter) return;

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
        cart = [];
    }

    counter.textContent = Array.isArray(cart) ? cart.length : 0;
}

updateCartCount();
window.addEventListener("storage", updateCartCount);
window.addEventListener("pageshow", updateCartCount);


/* =========================================================
   FRIENDLY ERROR MESSAGES
========================================================= */

function authMessage(error) {

    switch (error && error.code) {

        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Incorrect email or password.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/email-already-in-use":
            return "This email is already registered. Please log in.";

        case "auth/weak-password":
            return "Password should be at least 6 characters.";

        case "auth/too-many-requests":
            return "Too many attempts. Please wait a little and try again.";

        case "auth/network-request-failed":
            return "Network problem. Please check your internet and try again.";

        case "auth/popup-blocked":
            return "Please allow popups for this website.";

        case "auth/unauthorized-domain":
            return "This website's domain is not allowed in Firebase yet. " +
                   "Add it in Firebase > Authentication > Settings > Authorized domains.";

        case "auth/operation-not-allowed":
            return "This sign-in method is not turned on in Firebase > Authentication > Sign-in method.";

        case "auth/operation-not-supported-in-this-environment":
            return "Please open the website through http:// or https:// " +
                   "(for example VS Code Live Server). Login does not work when the file is opened directly.";

        case "auth/invalid-api-key":
        case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
            return "The Firebase apiKey in firebase-init.js is wrong. Copy it again from the Firebase console.";

        default:
            return "Something went wrong (" + ((error && error.code) || "unknown") + "). Please try again.";
    }
}


/* =========================================================
   LOGIN POPUP
========================================================= */

function showMode(mode) {

    if (!loginForm || !signupForm) return;

    if (mode === "signup") {

        loginForm.style.display = "none";
        signupForm.style.display = "flex";

        loginTitle.textContent = "Create Your Account";
        loginSubtitle.textContent =
            "Join WOOD VIDA and keep your favorite pieces and orders together.";
        switchText.textContent = "Already have an account?";
        switchButton.textContent = "Login";

    } else {

        signupForm.style.display = "none";
        loginForm.style.display = "flex";

        loginTitle.textContent = "Welcome Back!";
        loginSubtitle.textContent = "Login to continue your WOOD VIDA journey.";
        switchText.textContent = "Don't have an account?";
        switchButton.textContent = "Create Account";
    }
}

function openLogin(mode) {

    if (!modal) return;

    showMode(mode || "login");
    modal.classList.add("active");
}

function closeLogin() {

    if (modal) modal.classList.remove("active");
}

if (modalClose) modalClose.addEventListener("click", closeLogin);

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) closeLogin();
    });
}

if (switchButton) {
    switchButton.addEventListener("click", function () {
        const loginVisible = loginForm.style.display !== "none";
        showMode(loginVisible ? "signup" : "login");
    });
}


/* =========================================================
   ACCOUNT DRAWER
========================================================= */

function openDrawer() {

    if (!drawer || !overlay) return;

    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
}

function closeDrawer() {

    if (!drawer || !overlay) return;

    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
}

if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
if (overlay) overlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeDrawer();
        closeLogin();
    }
});

/* Account button: logged out -> popup, logged in -> drawer */

if (accountButton) {
    accountButton.addEventListener("click", function (event) {

        event.preventDefault();

        if (auth.currentUser) {
            openDrawer();
        } else {
            openLogin("login");
        }
    });
}

if (drawerLogin) {
    drawerLogin.addEventListener("click", function () {
        closeDrawer();
        openLogin("login");
    });
}

if (settingsLink) {
    settingsLink.addEventListener("click", function (event) {
        if (!auth.currentUser) {
            event.preventDefault();
            closeDrawer();
            openLogin("login");
        }
    });
}

if (drawerLogout) {
    drawerLogout.addEventListener("click", async function () {

        try {
            await signOut(auth);
            closeDrawer();
        } catch (error) {
            console.error(error);
            alert("Logout failed. Please try again.");
        }
    });
}


/* =========================================================
   SHOW THE LOGGED-IN USER
========================================================= */

function renderUser(user) {

    if (user) {

        const name = user.displayName || user.email || "Wood Vida Member";

        if (drawerName)  drawerName.textContent  = name;
        if (drawerEmail) drawerEmail.textContent = user.email || "";
        if (accountLabel) accountLabel.textContent = name.split(" ")[0];

        if (drawerAvatar) {
            const letter = document.createElement("span");
            letter.className = "account-avatar-letter";
            letter.textContent = name.charAt(0).toUpperCase();
            drawerAvatar.replaceChildren(letter);
        }

        if (drawerLogin)  drawerLogin.style.display  = "none";
        if (drawerLogout) drawerLogout.style.display = "block";

    } else {

        if (drawerName)  drawerName.textContent  = "Guest";
        if (drawerEmail) drawerEmail.textContent = "Sign in to access your account";
        if (accountLabel) accountLabel.textContent = "Account";
        if (drawerAvatar) drawerAvatar.innerHTML = defaultAvatarHTML;

        if (drawerLogin)  drawerLogin.style.display  = "block";
        if (drawerLogout) drawerLogout.style.display = "none";
    }
}


/* =========================================================
   EMAIL LOGIN
========================================================= */

function chosenPersistence() {
    return rememberMe && !rememberMe.checked
        ? browserSessionPersistence
        : browserLocalPersistence;
}

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = $("login-email").value.trim();
        const password = $("login-password").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        const button = loginForm.querySelector(".login-submit");
        if (button) button.disabled = true;

        try {

            await setPersistence(auth, chosenPersistence());
            await signInWithEmailAndPassword(auth, email, password);

            loginForm.reset();
            if (rememberMe) rememberMe.checked = true;

            closeLogin();

        } catch (error) {

            console.error(error);
            alert(authMessage(error));

        } finally {

            if (button) button.disabled = false;
        }
    });
}


/* =========================================================
   EMAIL SIGN UP
========================================================= */

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = $("signup-name").value.trim();
        const email = $("signup-email").value.trim();
        const password = $("signup-password").value;

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const button = signupForm.querySelector(".login-submit");
        if (button) button.disabled = true;

        try {

            await setPersistence(auth, browserLocalPersistence);

            const credential =
                await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(credential.user, { displayName: name });

            renderUser(auth.currentUser);

            signupForm.reset();
            closeLogin();

            alert("Welcome to WOOD VIDA, " + name + "! Your account has been created.");

        } catch (error) {

            console.error(error);
            alert(authMessage(error));

        } finally {

            if (button) button.disabled = false;
        }
    });
}


/* =========================================================
   CONTINUE WITH GOOGLE (every .google-login button)
========================================================= */

async function googleSignIn() {

    try {

        await setPersistence(auth, chosenPersistence());

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        await signInWithPopup(auth, provider);

        closeLogin();

    } catch (error) {

        if (
            error.code === "auth/popup-closed-by-user" ||
            error.code === "auth/cancelled-popup-request"
        ) {
            return;
        }

        console.error(error);
        alert(authMessage(error));
    }
}

document.querySelectorAll(".google-login").forEach(function (button) {
    button.addEventListener("click", googleSignIn);
});


/* =========================================================
   FORGOT PASSWORD
========================================================= */

if (forgotLink) {

    forgotLink.addEventListener("click", async function (event) {

        event.preventDefault();

        const emailInput = $("login-email");
        const email = emailInput ? emailInput.value.trim() : "";

        if (!email) {
            alert("Please enter your email address first.");
            if (emailInput) emailInput.focus();
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent. Please check your inbox (and spam).");

        } catch (error) {

            console.error(error);
            alert(authMessage(error));
        }
    });
}


/* =========================================================
   AUTH STATE + FIRST-VISIT POPUP
========================================================= */

let firstCheckDone = false;

onAuthStateChanged(auth, function (user) {

    renderUser(user);

    if (firstCheckDone) return;
    firstCheckDone = true;

    const params = new URLSearchParams(window.location.search);
    const wantsLogin = params.get("login") === "1";

    if (wantsLogin) {
        history.replaceState(null, "", window.location.pathname);
    }

    if (user) {
        storeSet(SEEN_KEY, "1");
        return;
    }

    if (wantsLogin) {
        openLogin("login");
        return;
    }

    /* first visit ever: show the popup once */
    if (!storeGet(SEEN_KEY)) {

        setTimeout(function () {

            if (!auth.currentUser) openLogin("login");

            storeSet(SEEN_KEY, "1");

        }, 1200);
    }
});