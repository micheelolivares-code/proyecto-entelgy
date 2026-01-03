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
            <ul>
              ${favoritos
                .map(pais => `<li>${pais.name}</li>`)
                .join('')}
            </ul>
          `
      }
    `;
  }
}

customElements.define('favoritos-paises', FavoritosPaises);