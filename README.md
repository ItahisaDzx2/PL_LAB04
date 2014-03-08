# Resumen

Analizador léxico para un subconjunto de JavaScript basado en el [*TDOP project*](https://github.com/douglascrockford/TDOP) desarrollado por **Douglas Crockford** (douglas@crockford.com). En este caso, se hace uso de las expresiones regulares, y sus propiedades y herramientas, para obtener un código más conciso.


# Motivación

La aplicación fue propuesta para ser desarrolla en la asignatura **Procesadores de Lenguajes**, del tercer año del **Grado en Ingeniería Informática**. Se corresponde con la 4ª práctica de la asignatura.

# Funcionamiento

Puede probar en [Heroku](http://pl-lab04.herokuapp.com/), el funcionamiento del analizador.

Una vez allí, seleccione entre los ficheros inputs disponibles (que contienen ejemplos de código en javascript) o edite/escriba código javascript en el área de texto. Pulsando sobre "analizar" aparecerá el código parseado.

Nota: en los ficheros inputs pueden observarse las palabras AJAX y GET; éstas señalan el método de carga utilizado.

# Desarrollo

Los lenguajes y herramientas (frameworks, librerías, etc.) utilizados para el desarrollo del presente proyecto fueron:

* Ruby gems
* Sinatra
* Heroku
* HTML/CSS/Javascript
* JQuery

# Tests

Entorno de pruebas basado en Mocha y Chai.
Pueden ejecutarse las pruebas [aquí](http://pl-lab04.herokuapp.com/tests).
Se testean el LocalStorage, las funciones bexec, dump_get, dump_ajax, main, y main parse, incluyendo algunos errores.

# Colaboradores

| Autores | E-mail |
| ---------- | ---------- |
| María D. Batista Galván   | magomenlopark@gmail.com  |
| Itahisa M. Díaz Díaz      | itahisadiaz@gmail.com   |


# Licencia

Licencia BSD.

