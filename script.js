document.getElementById('breakfastForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const bebida = document.getElementById('bebida').value;
    const comida = document.getElementById('comida').value;
    const hora = document.getElementById('hora').value;
    let pan = '';
    let ingredientes = [];
    let tostadaHecha = '';

    if (comida === 'tostada_hecha') {
        tostadaHecha = document.getElementById('tostada_hecha').value;
    } else if (comida === 'tostada_personalizada') {
        pan = document.getElementById('pan').value;
        document.querySelectorAll('input[name="ingredientes"]:checked').forEach((checkbox) => {
            ingredientes.push(checkbox.value);
        });
    }
    
    // Crear objeto JSON con los datos del pedido
    const pedido = {
        nombre: nombre,
        bebida: bebida,
        comida: comida,
        pan: pan,
        ingredientes: ingredientes,
        tostadaHecha: tostadaHecha,
        horaEntrega: hora
    };
    document.getElementById('result').textContent = JSON.stringify(pedido, null, 2);

    // Llamar a la función para guardar en localStorage
    guardarPedidoEnLocalStorage(pedido);
});


//Lógica de ocultar los listados dependiendo que se pida.
document.getElementById('comida').addEventListener('change', function() {
    const comida = document.getElementById('comida').value;
    const tipoPanGroup = document.getElementById('tipoPanGroup');
    const ingredientesGroup = document.getElementById('ingredientesGroup');
    const tostadaHechaGroup = document.getElementById('tostadaHechaGroup');
    //Si se pide tostada ya hecha se muestra el listado de las tostadas hechas y del tipo de pan.
    if (comida === 'tostada_hecha') {
        tipoPanGroup.style.display = 'block';
        ingredientesGroup.style.display = 'none';
        tostadaHechaGroup.style.display = 'block';
    //Si se elige tostada personalizada, se muestra el listado del tipo de pan y de los ingredientes a seleccionar.
    } else if (comida === 'tostada_personalizada') {
        tipoPanGroup.style.display = 'block';
        ingredientesGroup.style.display = 'block';
        tostadaHechaGroup.style.display = 'none';
    //Si no es tostada (Por ejemplo bolleria) entonces no muestra los paneles de las tostadas.
    } else {
        tipoPanGroup.style.display = 'none';
        ingredientesGroup.style.display = 'none';
        tostadaHechaGroup.style.display = 'none';
    }
});              

function guardarPedidoEnLocalStorage(pedido) {
    // Obtener el array de pedidos actual
    let pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
    const fs = require('fs');
    fs.writeFileSync('pedidos.json', pedido);
    // Agregar el nuevo pedido al array de pedidos
    pedidos.push(pedido);

    // Guardar el array actualizado de pedidos en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    console.log('Pedido guardado en el archivo pedidos.json');

}






// Write the JSON string to a file named pedidos.json


