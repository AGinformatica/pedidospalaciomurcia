const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);
const twilioNumber = 'YOUR_TWILIO_PHONE_NUMBER'; // Twilio phone number

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-sms', (req, res) => {
    const { nombre, bebida, comida, hora, pan, ingredientes, tostada_hecha } = req.body;

    let pedido = `Nombre: ${nombre}, Bebida: ${bebida}, Comida: ${comida}, `;
    if (comida === 'tostada_hecha') {
        pedido += `Tostada Hecha: ${tostada_hecha}, `;
    } else if (comida === 'tostada_personalizada') {
        pedido += `Tipo de Pan: ${pan}, Ingredientes: ${ingredientes.join(', ')}, `;
    }
    pedido += `Hora de Entrega: ${hora}`;

    client.messages
        .create({
            body: `Nuevo pedido: ${pedido}`,
            from: twilioNumber,
            to: 'RESTAURANT_PHONE_NUMBER', // Restaurant phone number
        })
        .then(message => {
            console.log(message.sid);
            res.send('Pedido enviado correctamente');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error al enviar el pedido');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
