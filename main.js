import './components/lista-paises.js';
import './components/tarjeta-pais.js';
import './components/modal-pais.js';
import './components/favoritos-paises.js';

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('abrir-pais', (event) => {    
    document.querySelector('modal-pais').abrir(event.detail);
    const modal = document.querySelector('modal-pais');
    if (!modal) {
      console.error('No se encontró <modal-pais> en el DOM');
      return;
    }
    modal.abrir(event.detail);
  });
});
