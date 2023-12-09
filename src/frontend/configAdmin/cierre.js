const selectMenu = document.getElementById('select');
selectMenu.addEventListener('change', () => {
    const selectedOption = selectMenu.options[selectMenu.selectedIndex].id;

    switch (selectedOption) {
        case 'perfil':
            window.location.href = '../configUsuario/configUsuario.html';
            break;
        case 'cierreSesion':
            localStorage.removeItem('usuario');
            window.location.href = '../index/index.html';
            break;
    }
});
