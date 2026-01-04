class DetallePais extends HTMLElement {
  connectedCallback() {
    this.style.display = 'none';
    this.render();
  }

  render() {
  this.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-banner">
          <img id="pais-bandera-modal" src="" alt="Bandera">
          <button class="close-btn">✖</button>
        </div>        
        <div class="modal-body-content">
          <h3 class="section-title">📍 Información General</h3>    
          <div class="info-grid">
            <div class="info-box"><label>Nombre Oficial</label><span id="nombre-pais"></span></div>
            <div class="info-box"><label>Subregión</label><span id="pais-subregion"></span></div>
            <div class="info-box"><label>Capital</label><span id="pais-capital"></span></div>
            <div class="info-box"><label>Población</label><span id="pais-poblacion"></span></div>
            <div class="info-box"><label>Área</label><span id="pais-area"></span></div>
            <div class="info-box"><label>Dominio</label><span id="pais-dominio"></span></div>
            <div class="info-box"><label>Independiente</label><span id="pais-independiente"></span></div>
            <div class="info-box"><label>Moneda</label><span id="pais-moneda"></span></div>
            <div class="info-box" style="grid-column: span 2;"><label>Idiomas</label><span id="pais-idiomas"></span></div>
          </div>
          <div class="map-container">
             <a id="pais-mapa" href="#" target="_blank" class="map-link">📖 Ver en Google Maps</a>
          </div>
          <button id="favorite-btn" class="btn-fav-yellow">⭐ Agregar a favoritos</button>
        </div>
      </div>
    </div>
  `;

    this.querySelector('.close-btn').addEventListener('click', () => this.cerrar());
    this.querySelector('#favorite-btn').addEventListener('click', () => this.toggleFavorite());
    this.querySelector('.modal-backdrop').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) this.cerrar();
    });
  }

  abrir(data) {
    this.paisData = data;
    const img = this.querySelector('#pais-bandera-modal');
    img.src = data.flag || '';
    img.alt = `Bandera de ${data.name}`;
    this.querySelector('#nombre-pais').textContent = data.name || 'N/A';
    this.querySelector('#pais-capital').textContent = data.capital || 'N/A';
    this.querySelector('#pais-poblacion').textContent = Number(data.population).toLocaleString() || '0';
    this.querySelector('#pais-subregion').textContent = data.subregion || 'N/A';
    this.querySelector('#pais-area').textContent = data.area || 'N/A';
    this.querySelector('#pais-dominio').textContent = data.dominio || 'N/A';
    this.querySelector('#pais-independiente').textContent = data.independiente || 'N/A';
    this.querySelector('#pais-moneda').textContent = data.currency || 'N/A';
    this.querySelector('#pais-idiomas').textContent = data.languages || 'N/A';
    this.querySelector('#pais-mapa').href = data.map || '#';
    this.actualizarBotonFavorito();
    this.style.display = 'block';
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
    if (esFavorito) {
      btn.textContent = '❌ Quitar de favoritos';
      btn.style.background = '#e74c3c';
      btn.style.color = 'white';
    } else {
      btn.textContent = '⭐ Agregar a favoritos';
      btn.style.background = '#f1c40f';
      btn.style.color = 'black';
    }
  }
}
customElements.define('modal-pais', DetallePais);