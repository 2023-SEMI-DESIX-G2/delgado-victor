const { get } = require("./utils");
module.exports = {
  arrPokemonesCadenaEvolucion: [],
  async obtenerInfoPokemon(nombrePokemon) {
    const response = await get(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
    const { abilities, name, height, weight, id } = response;
    const cadenaEvolutiva = await this.obtenerDeEvolucion(id);
    const cadenaPokemones = this.arregloCadenaEvolucion(cadenaEvolutiva);
    return {
      name,
      id,
      weight,
      height,
      abilities: abilities.map((ability) => ability.ability.name).join(", "),
        cadenaEvolucion: cadenaPokemones.join(", "),
    };
  },
  async obtenerDeEvolucion(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const cadenaEvolucion = await get(url);
    const { evolution_chain } = cadenaEvolucion;
    const cadenaEvolucion2 = await get(evolution_chain.url);
    const { chain } = cadenaEvolucion2;
    return chain;
  },

  arregloCadenaEvolucion(chain) {
    this.arrPokemonesCadenaEvolucion = [];
    const {evolves_to,species: { name },} = chain;
    this.arrPokemonesCadenaEvolucion.push(name);
    this.recorrerArrEvolucion(evolves_to);
    return this.arrPokemonesCadenaEvolucion;
  },

  recorrerArrEvolucion(evolves_to) {
    evolves_to.forEach((element) => {
      const {species: { name },} = element;
      this.arrPokemonesCadenaEvolucion.push(name);
      if (element.evolves_to.length > 0) {
        this.recorrerArrEvolucion(element.evolves_to);
      }
    });
  },
  
};
