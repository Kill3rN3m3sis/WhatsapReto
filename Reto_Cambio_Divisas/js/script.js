//validation to avoid negative numbers
const input = document.getElementById('cantidad_uno');

input.addEventListener('input', function(){
    if(this.value < 0) {
        this.value = 0;
    }

});


const monedaEl_one = document.getElementById('moneda_uno');
const monedaEl_two = document.getElementById('moneda_dos');
const cantidadEl_one = document.getElementById('cantidad_uno');
const cantidadEl_two = document.getElementById('cantidad_dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


// fetch exchange rate and update the dom
function calculate(){
   const moneda_one = monedaEl_one.value;
   const moneda_two = monedaEl_two.value;

   fetch(`https://api.frankfurter.app/latest?base=${moneda_one}&symbols=${moneda_two}`)
   .then(res => res.json() )
   .then(data => {
        const taza = data.rates[moneda_two];
        cambioEl.innerText = `1 ${moneda_one} = ${taza}${moneda_two}`;
        cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);
   } );
   
}

//Event listeners
monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();

} );

calculate();
