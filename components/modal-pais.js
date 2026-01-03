class DetallePais extends HTMLElement {
  connectedCallback() {
    this.style.display = 'none';
    this.render();
  }

  
  render() {
  this.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <button class="close-btn">✖</button>

        <h2 id="nombre-pais"></h2>

        <div class="modal-body">
          <p><strong>Capital:</strong> <span id="pais-capital"></span></p>
          <p><strong>Población:</strong> <span id="pais-poblacion"></span></p>
          <p><strong>Subregión:</strong> <span id="pais-subregion"></span></p>
          <p><strong>Idiomas:</strong> <span id="pais-idiomas"></span></p>
          <p><strong>Moneda:</strong> <span id="pais-moneda"></span></p>
          <p style="margin-top: 1rem;">
            <a id="pais-mapa" href="#" target="_blank" style="color: #3498db; text-decoration: none; font-weight: bold;">
              📍 Ver en Google Maps
            </a>
          </p>
        </div>

        <button id="favorite-btn">⭐ Agregar a favoritos</button>
      </div>
    </div>
  `;

  this.querySelector('.close-btn').addEventListener('click', () => this.cerrar());
  this.querySelector('#favorite-btn').addEventListener('click', () => this.toggleFavorite());
}

  abrir(data) {
   this.paisData = data;
   this.querySelector('#nombre-pais').textContent = data.name;
   this.querySelector('#pais-capital').textContent = data.capital;
   this.querySelector('#pais-poblacion').textContent = Number(data.population).toLocaleString();
   this.querySelector('#pais-subregion').textContent = data.subregion || 'N/A';
   this.querySelector('#pais-idiomas').textContent = data.languages || 'N/A';
   this.querySelector('#pais-moneda').textContent = data.currency || 'N/A';
   this.querySelector('#pais-mapa').href = data.map || '#';
   this.actualizarBotonFavorito();
   this.style.display = 'block';
   this.querySelector('#pais-moneda').textContent = data.currency || 'N/A';
 }

  cerrar() {
    this.style.display = 'none';
  }

  toggleFavorite() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const existe = favoritos.some(p => p.name === this.paisData.name);

    if (existe) {
      const nuevos = favoritos.filter(p => p.name !== this.paisData.name);
      localStorage.setItem('favoritos', JSON.stringify(nuevos));
    } else {
      favoritos.push(this.paisData);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    this.actualizarBotonFavorito();
    document.dispatchEvent(new Event('favoritos-actualizados'));
  }

  actualizarBotonFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const esFavorito = favoritos.some(p => p.name === this.paisData.name);

    const btn = this.querySelector('#favorite-btn');
    btn.textContent = esFavorito
      ? '❌ Quitar de favoritos'
      : '⭐ Agregar a favoritos';
  }
}

customElements.define('modal-pais', DetallePais);