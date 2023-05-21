window.rick = new Audio('https://henryruss2.github.io/rickroll.mp3');
rick.roll = rick.play;

rick.roll();
document.addEventListener('DOMContentLoaded', () => { 
    window.speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(), { text: 'This is your require, please check the userscript readme if you dont like the song' }));
});
