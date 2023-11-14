let isDarkTheme = false;

function alternarTema() {
    const body = document.body;
    isDarkTheme = !isDarkTheme;
    body.classList.toggle('dark-theme', isDarkTheme);
}

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', alternarTema);