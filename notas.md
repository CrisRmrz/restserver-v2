## Heroku
Primero ir al package.json y cambiar el "test": "echo \"Error: no test specified\" && exit 1" por un "start": "node app"
Despues las variables de entorno o las variables de mi archivo .env debemos subirlas con el cmd
Ver variables de entorno que tenemos: heroku config
Subir variable de entorno: heroku config:set nombreDeVariable="ellinkdemongoporejemplo"

## Tags
git tag -a v1.0.0 -m "Configuraciones iniciales"
git push --tags para subir los tags, porque con un git push normal no se suben

## Express-validator
Con este paquete implementé mis middlewares para realizar las validaciones

## Uso de JWT
Aquí vamos a utilizar los JWT para manejar la autenticacion de los usuarios
Consta de 3 partes: HEADER, PAYLOAD y la firma o VERIFY SIGNATURE
NUNCA meter informacion sensible en el payload de los JWT, ya que es muy facil acceder a esa informacion

## Populate de mongoose
El populate en mongoose funciona para relacionar las colecciones en MongoDB

https://mongoosejs.com/docs/populate.html

    Categoria.find() //Nos tira todos los usuarios de la base de datos
        .populate('usuario','nombre') //Para que haga la relacion con usuario(Este usuario tiene que ir escrito justo como lo tenemos escrito en la coleccion de categorias en la base de datos) y solo muestre el nombre

Si quiero varias cosas de la tabla con la que la estoy relacionando seria asi: 
    .populate('usuario',{nombre:'nombre', correo:'correo'})