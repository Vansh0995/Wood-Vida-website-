/* =========================================================
   WOOD VIDA — LOADING PAGE
   loading.html, loading.css, loading.js, logowoodvida.png and
   loading-tree-desk.png must be in the SAME folder as index.html
========================================================= */

/* tell index.html that the loading screen has already been shown
   in this browser session (so it does not send you back here) */

try {
    sessionStorage.setItem("woodVidaLoaded", "1");
} catch (error) {}


function goHome() {

    window.location.href = "index.html";

}


window.addEventListener("load", function () {

    const loadingScreen =
        document.querySelector(".loading-screen");

    if (!loadingScreen) {
        goHome();
        return;
    }

    setTimeout(function () {

        loadingScreen.classList.add("loading-exit");

        setTimeout(goHome, 800);

    }, 3000);

});