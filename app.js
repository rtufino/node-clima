const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

const argv = require('yargs').options({
    nombre: {
        alias: 'n',
        desc: 'Nombre de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

// ubicacion.getCiudadLatLon(argv.nombre)
//     .then(console.log);

// clima.getClima(-0.19, -78.5)
//     .then(console.log);

const getInfo = async(ciudad) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(ciudad);
        const temp = await clima.getClima(coords.lat, coords.lon);
        return `El clima de ${ coords.name } es de ${ temp }.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${ ciudad } ${e}`;
    }
}

getInfo(argv.nombre)
    .then(console.log)
    .catch(console.log);