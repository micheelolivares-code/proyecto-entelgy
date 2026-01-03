import { obtenerPaises } from '../services/pais-services.js';
class ListaPaises extends HTMLElement {
  async connectedCallback() {
    console.log('lista-paises conectado');
    const paises = await obtenerPaises();
console.log(paises);
    this.innerHTML = `<div class="grid"></div>`;
    console.log(this.innerHTML);
    const grid = this.querySelector('.grid');

    paises.forEach(pais => {
     const tarjeta = document.createElement('tarjeta-pais');
     tarjeta.setAttribute('nombre', pais.name);
     tarjeta.setAttribute('bandera', pais.flag);
     tarjeta.dataset.capital = pais.capital;
     tarjeta.dataset.population = pais.population;
     tarjeta.dataset.subregion = pais.subregion;
     tarjeta.dataset.languages = pais.languages;
     tarjeta.dataset.map = pais.map;
     tarjeta.dataset.currency = pais.currency;

     grid.appendChild(tarjeta);
   });
  }
}

customElements.define('lista-paises', ListaPaises);