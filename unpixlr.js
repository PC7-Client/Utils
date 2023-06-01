// ==UserScript==
// @name         UnPixlr
// @version      1.0
// @description  Unlimited Pixlr Saves
// @author       AceSilentKill
// @match        https://pixlr.com/*
// @icon         https://lh3.googleusercontent.com/u/4/drive-viewer/AFGJ81qkNA-QN15kLJkeNURDlJVZCvXlIuK8-kJWSCJwNySBhHqMKV1Nzw1X0xehGZofEfU-Il6iflDza5AhQnUZMI9fHamm=w2560-h1293
// @grant        unsafeWindow
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

unsafeWindow.addEventListener('load', function() {
    localStorage.setItem('user-settings', '{"lastNewsCheck":"1969-12-31T01:01:01.900Z","dailySave":{"day":1,"tally":1}}');

    setTimeout(function() {
        const modal = document.getElementsByClassName('modal')[0];
        if (modal) modal.remove();
    }, 500);

    GM_addStyle('#right-space { display: none !important; visibility: hidden !important; }');
});
