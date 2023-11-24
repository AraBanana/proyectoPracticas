// Archivo menu.js

// Función para obtener la imagen desde localStorage al cargar la página
window.onload = function () {
    const storedImage = localStorage.getItem('storedImage');
    const profileImage = document.getElementById('profile-image');

    if (storedImage) {
        profileImage.src = storedImage;
    }
}

function previewImage() {
    const fileInput = document.getElementById('file-input');
    const profileImage = document.getElementById('profile-image');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            profileImage.src = e.target.result;

            // Guardar la URL de la imagen en localStorage
            localStorage.setItem('storedImage', e.target.result);
        };

        reader.readAsDataURL(file);
    }
}

function redirectToFormulario() {
    // Redirige a la página del formulario
    window.location.href = 'formulario.html';
}

function redirectToDocumentacion(){
    window.location.href = 'documentacion.html';
}
function redirectToInformacion(){
    window.location.href = 'menu.html';
}


function redirectToLiberacion() {
    window.location.href = 'formLiberacion.html';
}

function redirectToPresentacion() {
    window.location.href = 'formulario.html';
}

function redirectToAceptacion() {
    window.location.href = 'formAceptacion.html';
}
function redirectToPropuesta() {
    window.location.href = 'propuesta.html';
}

function handleTipoCartaChange() {
    var selectedTipoCarta = document.getElementById("tipoCarta").value;

    if (selectedTipoCarta === "carta_liberacion") {
        redirectToLiberacion();
    }
    else if (selectedTipoCarta === "carta_presentacion") {
        redirectToPresentacion();
    }
    else if (selectedTipoCarta === "carta_aceptacion") {
        redirectToAceptacion();
    }
    else if (selectedTipoCarta === "carta_propuesta") {
        redirectToPropuesta();
    }
}
