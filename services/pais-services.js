const API_URL = 'https://restcountries.com/v3.1/region/ame';

export async function obtenerPaises() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.slice(0, 12).map(pais => ({
    name: pais.name.common,
    capital: pais.capital?.[0] || 'No disponible',
    population: pais.population,
    flag: pais.flags.png,
    subregion: pais.subregion || 'N/A',
    languages: pais.languages ? Object.values(pais.languages).join(', ') : 'N/A',
    map: pais.maps.googleMaps,
    currency: pais.currencies ? Object.values(pais.currencies)[0].name : 'N/A',
    area: pais.area ? pais.area.toLocaleString() : 'N/A',
    dominio: pais.tld ? pais.tld[0] : 'N/A',
    independiente: pais.independent ? 'Sí' : 'No'
  }));
}

