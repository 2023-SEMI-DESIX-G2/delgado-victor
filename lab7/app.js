let arrPokemonesCadenaEvolucion = [];
const consumirApi = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data;
} 
const  obtenerDeEvolucion= async(id)=>{
    const url =`https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const cadenaEvolucion = await consumirApi(url);
    const {evolution_chain} = cadenaEvolucion;
    const cadenaEvolucion2 = await consumirApi(evolution_chain.url);
    const {chain} = cadenaEvolucion2;
    return chain;
   }
  const  arregloCadenaEvolucion=(chain)=>{
    arrPokemonesCadenaEvolucion = [];
    const {evolves_to, species: {name}} = chain;
    arrPokemonesCadenaEvolucion.push(name);
    recorrerArrEvolucion(evolves_to);
    return arrPokemonesCadenaEvolucion;
   }
   const recorrerArrEvolucion= (evolves_to)=>{
    evolves_to.forEach(element => {
        const {species:{name}} = element;
        arrPokemonesCadenaEvolucion.push(name);
        if(element.evolves_to.length > 0){
            recorrerArrEvolucion(element.evolves_to);
        }
    });
   }

const salidaPokemonInfo = (data)=>{
    const { abilities,name, height, weight,id,cadenaEvolucion } = data;
    return {
        name,
        id,
        weight,
        height,
        abilities: abilities.map(ability => ability.ability.name).join(', '),
        cadenaEvolucion
    }
}
const print = async (pokemonName) => {
    const datos = await consumirApi(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const {id} = datos;
    const chain = await obtenerDeEvolucion(id);
    const arrEv = arregloCadenaEvolucion(chain);
    datos.cadenaEvolucion = arrEv.join(', ');
    const objdatos = salidaPokemonInfo(datos);
    console.log(JSON.stringify(objdatos));
}

print("pikachu");



