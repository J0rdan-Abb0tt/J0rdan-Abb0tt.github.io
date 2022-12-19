// parallax effect
const parallax = document.getElementById('parallax');

window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 + "px";
});


// typing effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector(".cursor");

const textArray = ["drawing enthusiast!", "guitarist!", "front-end developer!"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
};

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    };
};

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});


// light/dark mode toggle
let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.querySelector('#light-mode');
const lightModeToggleNavbar = document.querySelector('#light-mode-navbar');

const enableLightMode = () => {
    document.body.classList.add('light-mode');
    localStorage.setItem('lightMode', 'enabled');

    lightModeToggle.classList.add('light-mode-active');
    lightModeToggleNavbar.classList.add('light-mode-active');
};

const disableLightMode = () => {
    document.body.classList.remove('light-mode');
    localStorage.removeItem('lightMode');

    lightModeToggle.classList.remove('light-mode-active');
    lightModeToggleNavbar.classList.remove('light-mode-active');
};

if (lightMode === "enabled") {
    enableLightMode();
};

lightModeToggle.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    if (lightMode !== "enabled") {
        enableLightMode();
    } else {
        disableLightMode();
    };
});

lightModeToggleNavbar.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    if (lightMode !== "enabled") {
        enableLightMode();
    } else {
        disableLightMode();
    };
});

// hamburger sidebar open and close functions
function openNav() {
    document.querySelector('.navbar-container-hamburger').style.width = '93%';
};

function closeNav() {
    document.querySelector('.navbar-container-hamburger').style.width = '0%';
};