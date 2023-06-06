(()=>{

    Utils={
        init: ()=>{

        },
        dataStructure:{
            arrPokemonesCadenaEvolucion:[],
        },
        methods:{
            consumirApi: async(url)=>{
                const response = await fetch(url)
                const data = await response.json()
                return data;
            },
            extraerDatosPokemon: (datos)=>{
                const {abilities,height,id,sprites:{back_default,front_default}, weight, species:{name}} = datos;
                 return{
                    abilities,
                    height,
                    id,
                    front_default,
                    back_default,
                    weight,
                    name
                 }
               },
               obtenerDeEvolucion: async(id)=>{
                const url =`https://pokeapi.co/api/v2/pokemon-species/${id}`;
                const cadenaEvolucion = await Utils.methods.consumirApi(url);
                const {evolution_chain} = cadenaEvolucion;
                const cadenaEvolucion2 = await Utils.methods.consumirApi(evolution_chain.url);
                const {chain} = cadenaEvolucion2;
                return chain;
               },
               arregloCadenaEvolucion: (chain)=>{
                Utils.dataStructure.arrPokemonesCadenaEvolucion = [];
                const {evolves_to, species: {name},is_baby} = chain;
                Utils.dataStructure.arrPokemonesCadenaEvolucion.push({name,is_baby});
                Utils.methods.recorrerArrEvolucion(evolves_to);
                return Utils.dataStructure.arrPokemonesCadenaEvolucion;
               },
               recorrerArrEvolucion: (evolves_to)=>{
                evolves_to.forEach(element => {
                    const {species:{name},is_baby} = element;
                    Utils.dataStructure.arrPokemonesCadenaEvolucion.push({name,is_baby});
                    if(element.evolves_to.length > 0){
                        Utils.methods.recorrerArrEvolucion(element.evolves_to);
                    }
                });
               }
              
        }
    }
    window.utils = Utils;
   
})()