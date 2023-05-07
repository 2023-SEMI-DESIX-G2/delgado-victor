(()=>{

    const App = {
        init: function(){
           App.htmlElements.palindromeForm.addEventListener('submit', App.handlers.palindromoFormSubmit);
           App.htmlElements.cantLetrasForm.addEventListener('submit', App.handlers.cantLetrasFormSubmit);
           App.htmlElements.añoBisiestoForm.addEventListener('submit', App.handlers.añoBisiestoFormSubmit);
           App.htmlElements.sumatorioNumPrimoForm.addEventListener('submit', App.handlers.sumatorioNumPrimoFormSubmit);
           
        },

        htmlElements: {
            palindromeForm: document.getElementById('palindromeForm'),
            palindromoResponse: document.querySelector('.respPalindromo'),
            cantLetrasForm: document.getElementById('cantLetras'),
            cantLetrasResponse: document.querySelector('.respCantLetras'),
            añoBisiestoForm: document.getElementById('añoBisiestoForm'),
            añoBisiestoResponse: document.querySelector('.añoBisiestoResponse'),
            sumatorioNumPrimoForm: document.getElementById('sumatorioNumPrimoForm'),
            sumatorioNumPrimoResponse: document.querySelector('.sumatorioNumPrimoResponse'),
        },

        handlers: {
            palindromoFormSubmit: (event)=>{
                event.preventDefault();
                let numero = event.target.numero.value;
                let numeroBinario = App.methods.convertirNumABinario(numero);
                if (App.methods.esPalindromo(numero) && App.methods.esPalindromo(numeroBinario)) {
                    App.htmlElements.palindromoResponse.innerHTML = `el numero ${numero}  es un palindromo de doble base`;
                }else{
                    App.htmlElements.palindromoResponse.innerHTML = `el numero ${numero} no es un palindromo de doble base`;
                }
            },
            cantLetrasFormSubmit: (event)=>{
                event.preventDefault();
                let cadena = event.target.cadena.value;
                let cantidadLetras = App.methods.cantidadDeLetras(cadena);
                App.htmlElements.cantLetrasResponse.innerHTML = `la cantidad de letras es: ${JSON.stringify(cantidadLetras)}`;
            },
            añoBisiestoFormSubmit: (event)=>{
                event.preventDefault();
                let año = event.target.año.value;
                if (App.methods.añobisiesto(año)) {
                    App.htmlElements.añoBisiestoResponse.innerHTML = `el año ${año} es bisiesto`;
                }else{
                    App.htmlElements.añoBisiestoResponse.innerHTML = `el año ${año} no es bisiesto`;
                }
            },
            sumatorioNumPrimoFormSubmit: (event)=>{
                event.preventDefault();
                let numero = event.target.numero.value;
                if(numero > 0 && numero < 1000000){
                    let sumatoria = App.methods.sumatorioNumPrimo(numero);
                    App.htmlElements.sumatorioNumPrimoResponse.innerHTML = `la sumatoria de los numeros primos hasta ${numero} es de : ${sumatoria}`;
                }else{
                    App.htmlElements.sumatorioNumPrimoResponse.innerHTML = `el numero ${numero} debe ser mayor a 0 y menor a 1,000,000`;
                }
            }

        },

        methods:{
            esPalindromo: (num)=>{
              let numeroString = num.toString();
                let numeroInvertido = App.methods.invertirCadena(numeroString);
                return numeroString === numeroInvertido;
            },
            convertirNumABinario: (num)=>{
                let numeroBinario = '';
                while (num > 0) {
                    numeroBinario = (num % 2) + numeroBinario;
                    num = Math.floor(num / 2);
                }
                return numeroBinario;
            },
            invertirCadena: (cadena)=>{
                let cadenaInvertida = "";
                for (let i = cadena.length - 1; i >= 0; i--) {
                    cadenaInvertida += cadena[i];
                }
                return cadenaInvertida;
            },
            cantidadDeLetras: (cadena)=>{
               let cadenaSinEspacios= cadena.replace(/\s/g, '');
                const cantLetras = {};
                for(let i = 0; i < cadenaSinEspacios.length; i++){
                    let letra = cadenaSinEspacios[i];
                    let cantidad = 0;
                    for(let j = 0; j < cadenaSinEspacios.length; j++){
                        if(letra === cadenaSinEspacios[j]){
                            cantidad++;
                        }
                    }
                    cantLetras[letra] = cantidad;
                }
                return cantLetras;
            },
            añobisiesto: (año)=>{
                return año % 4 === 0 && año % 100 !== 0 || año % 400 === 0;
            },
            esPrimo: (num)=>{
                for (let i = 2; i < num; i++) {
                    if (num % i === 0) {
                        return false;
                    }
                }
                return num !== 1;
            },
            sumatorioNumPrimo: (num)=>{
                let sumatoria = 0;
                for (let i = 2; i <= num; i++) {
                    if (App.methods.esPrimo(i)) {
                        sumatoria += i;
                    }
                }
                return sumatoria;
            }

            
        }
    }

    App.init();
})()