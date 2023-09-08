// ==UserScript==
// @name         Killstreak Notifier
// @description  Feel your adrenaline rise the higher your killstreak goes!
// @author       DuneDude
// @match        *://krunker.io/*
// @grant        none
// @version      1.0
// @run-at       document-start
// ==/UserScript==

const settingsName = SettingsUtil({
    Killstreak_Notifier: {
        enableScript: {
            title: 'Enables Killstreak Notifier',
            type: 'checkbox',
            val: true,
            refresh: true
        },
        soundsEnabled: {
            title: 'Play a sound cue on every killstreak',
            type: 'checkbox',
            val: true,
            refresh: true
        },
        soundPack: {
            title: 'Sound Pack',
            type: 'select',
            options: {
                default: 'Default',
                jojoKS: 'Jojo ASB Announcer',
                quakeKS: 'Quake Announcer',
                unrealKS: 'Unreal Tournament Announcer',
                valorantKS: 'Valorant Default',
                valSpectrumKS: 'Valorant Spectrum',
                halo3KS: 'Halo Reach Announcer',
            },
            val: 'default',
            desc: 'Choose a sound pack to play for your killstreaks.',
            refresh: true,
        },
        supportLink: {
            title: 'Contact',
            desc: 'Got suggestions or issues? Join the rootkitten(); discord!',
            type: 'button',            
            buttonText: 'Discord Link',
            onclick: 'window.open("https://discord.gg/wEBvg4pGyz");',
            val: true,
        },
    },
});

if (!config.get(settingsName + '.Killstreak_Notifier.enableScript.val', true)) return; //stops script execution if disabled

/* Config Stuff */
const soundPack = config.get(settingsName + '.Killstreak_Notifier.soundPack.val', 'default');
const soundsEnabled = config.get(settingsName + '.Killstreak_Notifier.soundsEnabled.val', true);

/* Initializing Stuffs */
const soundPlayer = new Audio();
const ksShower = Object.assign(document.createElement('div'), {
    id: 'KSshower',
    style: 'text-align:center; margin-top:3%; margin-left:auto; margin-right:auto; font-size: 200%;',
});

const SOUNDS = {
    default: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/defaultTF2/ksDefault.mp3?raw=true'
    ],
    jojoKS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/ks5.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/ks10.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/ks15.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/ks20.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/ks25.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/jojoAnnouncer/overkill.wav?raw=true'

    ],
    quakeKS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/quakeAnnouncer/ks5.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/quakeAnnouncer/ks10.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/quakeAnnouncer/ks15.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/quakeAnnouncer/ks20.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/quakeAnnouncer/ks25.wav?raw=true'
    ],
    unrealKS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/ks5.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/ks10.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/ks15.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/ks20.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/ks25.wav?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/unrealTournament/overkill.wav?raw=true'
    ],
    valorantKS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantDefault/ks5.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantDefault/ks10.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantDefault/ks15.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantDefault/ks20.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantDefault/ks25.mp3?raw=true'
    ],
    valSpectrumKS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/ks5.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/ks10.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/ks15.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/ks20.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/ks25.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/valorantSpectrum/overkill.mp3?raw=true'
    ],
    halo3KS: [
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/ks5.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/ks10.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/ks15.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/ks20.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/ks25.mp3?raw=true',
        'https://github.com/r00tkitty/files/blob/main/killstreakNotifier/halo3Announcer/overkill.mp3?raw=true'
    ],
};

/* Util Functions */
const setKSText = (onA, msg, style) => {
    ksShower.innerHTML = `<span style='background-color:rgba(0, 0, 0, 0.5); border-radius:10px; background-size: 110% 120%'><span style='color:red;'>&nbsp;You </span> <span style='color:white; font-family:gamefont;'>are ${onA === true ? 'on a ' : ''}</span><span style='${style}'>${msg}&nbsp;</span></span>`;
    document.getElementById('inGameUI').appendChild(ksShower);
};

const fadeOut = () => {
    let opacity = 1;
    const intervalID = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            ksShower.style.opacity = opacity;

        } else {
            clearInterval(intervalID);
            ksShower.style.display = 'none';
            //ksShower.remove();
        }
    }, 50);
};

const playAudio = (i) => {
    if (!soundsEnabled) return;

    const lastIndex = SOUNDS[soundPack].length - 1;
    const soundURL = (i > lastIndex) ? SOUNDS[soundPack][lastIndex] : SOUNDS[soundPack][i];

    Object.assign(soundPlayer, { src: soundURL }).play();
};

const getKSText = (i) => { return `You're on a ${i} Kill Streak`; };
const getMessageType = (messageElement) => {
    const messageText = String(messageElement?.children[0]?.textContent).replaceAll('‎', '');

    switch (messageText) {
        case getKSText(5):
            setKSText(true, 'KILLING SPREE! [5]', 'color:#b3f251; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(0);
            break;
        case getKSText(10):
            setKSText(false, 'UNSTOPPABLE! [10]', 'color:#1b97f3; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(1);
            break;
        case getKSText(15):
            setKSText(true, 'RAMPAGE! [15]', 'color:#e13efb; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(2);
            break;
        case getKSText(20):
            setKSText(false, 'GODLIKE!   [20]', 'color:#fbc129; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(3);
            break;
        case getKSText(25):
            setKSText(false, 'NUCLEAR! [25]', 'color:#ee4040; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(4);
            break;
        case getKSText(50):
            setKSText(false, 'BEYOND NUCLEAR! [50]', '-webkit-animation: rainbow 1.4s linear infinite; font-family:gamefont;');
            setTimeout(fadeOut, 3000);

            playAudio(5);
            break;
        default:
            break;
    }
};

wFE('chatList').then(chatList => {
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const messageElement of mutation.addedNodes) getMessageType(messageElement);
        }
    }).observe(chatList, {
        attributes: true,
        childList: true,
        subtree: true
    });
});
