(()=>{
    const App = {
        init: function(){
            App.htmlelements.form.addEventListener('submit', App.handlers.onFormSubmit);
            
        },
        htmlelements: {
        form: document.querySelector('form'),
        response: document.querySelector('.inputs-container'),
        promedioResponse: document.querySelector('.promedio'),
        progressBar : document.querySelector('.progress-bar-fill'),
        porcentaje: document.querySelector('.porcentaje'),
        },
        handlers: {
            onFormSubmit: (e)=>{
                e.preventDefault(); 
                const value = e.target.querySelector('input').value;
                if(App.methods.numeroValido(value)){
                    App.methods.insertarInput(App.methods.crearInput(),value);
                    const arr = App.methods.arregloNotas(parseInt(value));
                    const promedio = App.methods.promedio(arr);
                    App.htmlelements.promedioResponse.innerHTML = promedio;
                    App.methods.llenarBarra(promedio);
                    App.methods.insertarValorABArra(promedio);
                    App.htmlelements.form.reset();
                }else{
                    alert('Ingrese ingrese un numero mayor a 0 y menor a 100');
                }
            }
        },
        methods: {
         inputsArr:[],

        crearInput: ()=> document.createElement('input'),

        insertarInput: (input,value)=> {
            input.value = value;
            App.htmlelements.response.appendChild(input);
        },  

        sumatoriaInputs:(inputs) =>inputs.reduce((a,b)=> a+b),

        promedio: (inputs) =>(App.methods.sumatoriaInputs(inputs)/inputs.length).toFixed(2),

        arregloNotas(input){
            App.methods.inputsArr.push(input);
            return App.methods.inputsArr;
        },

        llenarBarra: (promedio)=> App.htmlelements.progressBar.style.width = `${promedio}%`,  

        insertarValorABArra: (promedio) => {
            App.htmlelements.porcentaje.innerHTML = `${promedio}%`;
        },
        numeroValido: (num) =>  num>=0 && num <=100,         
        },
      
    }
    App.init(); 
})()