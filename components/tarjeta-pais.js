class TarjetaPais extends HTMLElement {
  connectedCallback() {
    const nombre = this.getAttribute('nombre');
    const bandera = this.getAttribute('bandera');
    this.innerHTML = `
      <div class="card">
        <img src="${bandera}" alt="Bandera de ${nombre}">
        <h3 class="country-title" style="cursor: pointer;">${nombre}</h3>
      </div>
    `;
    const titulo = this.querySelector('.country-title');
    titulo.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent('abrir-pais', {
          bubbles: true,
          composed: true,
          detail: {
            name: nombre,
            flag: bandera,
            capital: this.dataset.capital,
            population: this.dataset.population,
            subregion: this.dataset.subregion,
            languages: this.dataset.languages,
            currency: this.dataset.currency,
            map: this.dataset.map,
            area: this.dataset.area,
            dominio: this.dataset.dominio,
            independiente: this.dataset.independiente        
          }
        })
      );
    });
  }
}
customElements.define('tarjeta-pais', TarjetaPais);