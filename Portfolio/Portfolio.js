// parallax effect
const parallax = document.getElementById('parallax');

window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 + "px";
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