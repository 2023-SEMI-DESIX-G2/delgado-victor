(()=>{
    const App = {
        init: function(){
            App.htmllemets.form.addEventListener('submit', App.handlers.onsubmit);
        },
        htmllemets: {
            cardContainer: document.querySelector('.responseContainer'),
            input: document.querySelector('input'),
            form: document.querySelector('.fibonacciForm'),

        },
        handlers: {
            onsubmit: (e)=>{
                e.preventDefault();
                const value = parseInt(App.htmllemets.input.value);
                const data = App.methods.fibonacci(value);
                App.methods.imprimirEnPantalla(data);
                 const card  = document.querySelectorAll('.card');
                App.methods.recorrerCard(card);
            },
        },
        methods: {
            fibonacci: (num)=>{
                const series = [0, 1];
                for (let i = 2; i < num; i++) {
                  series[i] = series[i - 1] + series[i - 2];
                }
                return series;
            },
            template: (data)=>{
                let html = `
                    <div class="card">
                        <p>${data}</p>
                        <div class="icon">
                            <p class="delete">X</p>
                        </div>
                    </div>
                `;
                return html;
            },
            imprimirEnPantalla: (data)=>{
                App.htmllemets.cardContainer.innerHTML = '';
                data.forEach(element => {
                    const template = App.methods.template(element);
                    App.htmllemets.cardContainer.innerHTML += template;
                });
            },
            recorrerCard: (data)=>{
                data.forEach(element => {
                    element.addEventListener('click', App.methods.mostrarIcono);
                });
            },
            mostrarIcono: (e)=>{
                    e.target.querySelector('.icon').style.visibility = 'visible';
                    e.target.querySelector('.icon').addEventListener('click', App.methods.eliminarCard);
            },
            eliminarCard: (e)=>{
                const numeroAEliminar = e.target.parentElement.parentElement;
                numeroAEliminar.remove();

            },
        }
    }
    App.init();
    
})()