const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => { //Generar un JWT esta basado en promesas, asi que tenemos que retornar una promesa

    return new Promise( (resolve, reject) => {

        const payload = { uid }; //Este id es lo que va a tener el payload de mi JWT

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { //Creamos el jwt
            expiresIn: '4h'
        }, (err, token) => {

            if( err ){
                console.log( err );
                reject(err);
            }else {
                resolve( token ) //Devolvemos en forma de promesa el JWT ya creado
            }

        })

    })

}

module.exports = {
    generarJWT
}