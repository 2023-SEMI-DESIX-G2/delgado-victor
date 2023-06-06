
((Utils)=>{
   
    const App = {
        init: ()=>{
            App.htmlelements.form.addEventListener('submit', App.handlers.onformSubmit);
            App.htmlelements.btnLimpiar.addEventListener('click', App.handlers.onClick);
        },
        htmlelements: {
            form: document.querySelector('.poke-card'),
            response : document.querySelector('.response'),
            btnLimpiar: document.querySelector('.btn-limpiar'),
            input: document.querySelector('.pokemon-name'),

        },
        handlers :{
            onformSubmit: async (e)=>{
                e.preventDefault();
            App.htmlelements.response.style.display = 'block';
            App.htmlelements.btnLimpiar.style.visibility = 'visible';   
             const selectx= e.target.querySelector('#select-busqueda').value ;
             const inputValue= e.target.querySelector('.pokemon-name').value.toLowerCase() ;
             if(selectx ==='poke'){
                const datos = await Utils.methods.consumirApi(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
                const objDatos = Utils.methods.extraerDatosPokemon(datos);
                 App.methods.setearDatosPokemon(objDatos);
             }else{
                const datos = await Utils.methods.consumirApi(`https://pokeapi.co/api/v2/ability/${inputValue}`); 
                App.htmlelements.response.innerHTML = App.methods.habilidadTemplate(inputValue); 
                console.log('click');
                const salidaListaDePokemones = document.querySelector('.pokemon-List');
                App.methods.recorrerArrPokemon(datos,salidaListaDePokemones);
             }

            },
            onClick: ()=>{
                console.log('click');
                 App.methods.limpiarCampos();
            }
        },
        methods: {
            limpiarCampos : ()=>{
                App.htmlelements.response.style.display = 'none';
                App.htmlelements.response.innerHTML = '';
                App.htmlelements.btnLimpiar.style.visibility = 'hidden';
                App.htmlelements.input.value = '';
            },
           setearDatosPokemon: async (datos)=>{
            const {abilities,height,id,front_default,back_default,weight, name} = datos;
            const resultado = await App.methods.cadenaDeEvolucion(id);
            console.log( resultado );
            App.htmlelements.response.innerHTML = App.methods.pokemonTemplate(name,id,weight,height,front_default,back_default,abilities,resultado);

           },
           mostrarHabilidades: (abilities)=>{
                let habilidadesOutput = '';
             abilities.forEach(data => {
                const {ability:{name},is_hidden} = data;
                is_hidden?habilidadesOutput += `<li>${name} <i class="fa-regular fa-eye-slash"></i>`:
                    habilidadesOutput += `<li>${name}</li>`;
             });
             return habilidadesOutput;
           },
           mostrarCadenaEvolucion: (arr)=>{
            let template = '';
            console.log(arr);
            arr.forEach(data => {
                const {name,is_baby} = data;
                is_baby?template +=`<li class ="list-pokemon-evolution">${name} <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-kid" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M9 10l.01 0"></path>
                <path d="M15 10l.01 0"></path>
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                <path d="M12 3a2 2 0 0 0 0 4"></path>
                </svg></li>`:
                template += `<li>${name}</li>`;
            })

             return template;
            
            },

           cadenaDeEvolucion: async(id)=>{
            const chain = await Utils.methods.obtenerDeEvolucion(id);
            const arrEvolucion = Utils.methods.arregloCadenaEvolucion(chain);
            return arrEvolucion;
           },
           recorrerArrPokemon: (datos,htmlel)=>{
            const {pokemon} = datos;
            pokemon.forEach(element => {
                const {pokemon:{name}, is_hidden} = element;
                is_hidden?htmlel.innerHTML += `<li>${name} <i class="fa-regular fa-eye-slash"></i>`:
                htmlel.innerHTML += `<li>${name}</li>`;
            })

           },
           habilidadTemplate: (habilidad)=>{
             return `<section class = "salida-habilidades" >    
                <h1 class ="titulo-respuesta-habilidad">${habilidad}</h1>
                <h3>Quien puede aprenderlo</h3>
                <div >
                    <ul class="pokemon-List">
                    </ul>
                </div>
            </section>`

           },
           pokemonTemplate: (name,id,peso,altura,spriteFront,spriteBack,abilities,arreglo)=>{
            return `<div class="div">   
            <header>
                <h1 class="name-pokemon">${name} (${id})</h1> 
            </header>
            <section class="info-container">
                <div class="sprites">
                    <h3>Sprites</h3>
                    <div class="sprites-container">
                        <img src="${spriteFront}" alt="pokemon" class="front">
                        <img src="${spriteBack}" alt="pokemon" class="back">
                    </div>
                </div>
                <div class="wei-hei">
                    <h3>Peso/Atura</h3>
                    <p class="w-h">${peso}/${altura}</p>
                </div>
                <div class="evolution-chain">
                    <h3>Cadena de Evolucion</h3>
                    <ul class="lista-cadena-evolucion">
                    ${App.methods.mostrarCadenaEvolucion(arreglo)}
                    </ul>
                </div>
                <div class="habilidades">
                    <h3>Habilidades</h3>
                    <ul class="habilidades-list">
                        ${App.methods.mostrarHabilidades(abilities)}
                    </ul>
                </div>
        </div>`;
           }

        }
    }
    App.init()
    
})(window.utils)