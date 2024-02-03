// ==UserScript==
// @name         ZyBook Watch-It Solver
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Plays through all of the watch-it activities in the background :D
// @author       BestBuy
// @match        https://learn.zybooks.com/zybook/*/chapter/*/section/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zybooks.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const refreshButtons = () => {
        [...document.querySelectorAll('div[class*="speed-control"] > * > input')].forEach(x => {
            if (typeof x?.click !== 'function') return;
            if (x.dataset?.isEnabled !== '1') {
                x.click();
                x.dataset.isEnabled = '1';
            }

            const containerEl = x?.parentElement?.parentElement?.parentElement;
            if (!containerEl) return;

            const startBtn = containerEl.querySelector('button.start-button');
            if (!!startBtn && typeof startBtn?.click === 'function') startBtn.click();

            const playBtn = containerEl.querySelector('div.play-button');
            if (playBtn && playBtn?.parentElement && typeof playBtn?.parentElement?.click === 'function' && ![...containerEl.querySelectorAll('button[class*="step"]')].pop()?.className?.includes('highlight')) playBtn?.parentElement.click();
        });
    };
    setInterval(refreshButtons, 1000);
})();

