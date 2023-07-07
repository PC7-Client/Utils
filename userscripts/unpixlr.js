// ==UserScript==
// @name         UnPixlr
// @version      1.0
// @description  Unlimited Pixlr Saves
// @author       AceSilentKill
// @match        https://pixlr.com/*
// @icon         https://pixlr.com/favicon-32x32.png
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
