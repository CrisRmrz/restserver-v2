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
