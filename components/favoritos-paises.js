class FavoritosPaises extends HTMLElement {
  connectedCallback() {
    this.render();
    document.addEventListener('favoritos-actualizados', () => {
      this.render();
    });
  }
  render() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    this.innerHTML = `
      <h3>⭐ Favoritos</h3>
      ${
        favoritos.length === 0
          ? '<p>No hay países favoritos</p>'
          : `
            <div class="fav-list">
              ${favoritos
                .map(pais => `
                  <div class="fav-item" data-name="${pais.name}">
                    <img src="${pais.flag}" class="fav-mini-flag" alt="Bandera">
                    <span class="fav-text">${pais.name}</span>
                  </div>
                `)
                .join('')}
            </div>
          `
      }
    `;
    this.querySelectorAll('.fav-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        const modal = document.querySelector('modal-pais');
        if (modal) modal.abrir(favoritos[index]);
      });
    });
  }
}
customElements.define('favoritos-paises', FavoritosPaises);