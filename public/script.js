document.getElementById('playButton').addEventListener('click', function () {
    const overlay = document.querySelector('.transition-overlay');
    overlay.classList.add('transition-active');

    // Attendre la fin de l'animation avant de rediriger
    setTimeout(() => {
        window.location.href = '/game';  // On redirigera vers la page du jeu
    }, 1000); // Redirection à mi-chemin de l'animation
}); 