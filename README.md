# FIFA_API

LA APLICACION FUE DESARROLLADO CON NODEJS, EXPRESSJS, MYSQL, BOOTSTRAP, HTML, CSS <br/><br/>

En la carpeta Mysql se encuentra el script para crear la base de datos y su tabla. En la carpeta config se encuentra la configuracion para la conexion con la base de datos.<br/><br/>

"extraerAPI.js" Es el script para almacenar datos de la API de FIFA en la base de datos, para correr script ejecutar comando "npm run dataAPI", dentro de la carpeta raiz de la aplicacion una vez haya creado base de datos.<br/><br/>

Para correr aplicacion ejecutar comando "npm run start", dentro de la carpeta raiz de la aplicacion una vez haya creado base de datos y ejecutado script.
De manera local el link es http://localhost:3000/jugadores/busqueda_jugadores y para las API el mismo puerto local y las direcciones especificadas en el documento de la prueba.<br/><br/>

Deploy de app en heroku: https://apififa.herokuapp.com/jugadores/busqueda_jugadores <br/><br/>

APIs:<BR/>

Busqueda de jugadores por nombre:  GET https://apififa.herokuapp.com/api/v1/players<br/>
Ejemplo de uso: <br/>
/api/v1/players?search=cristi&order=asc&page=1 <BR/><BR/>

Busqueda de jugadores por equipo:  POST https://apififa.herokuapp.com/api/v1/team <BR/>
Ejemplo de request: <br/>
{
“Name” : “real madrid”,
“Page” : 1
}
<BR/><BR/>

En caso de querer hacer pruebas y el servidor este caido, notificar.
