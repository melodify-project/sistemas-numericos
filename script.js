/* =========================================================
   SISTEMAS NUMÉRICOS
   LÓGICA PRINCIPAL DEL PROGRAMA
   ========================================================= */


/*
    Esta cadena contiene todos los símbolos
    que pueden utilizarse en los sistemas numéricos.

    0-9 representan los primeros diez valores.

    A-F representan los valores 10-15.

    Por eso podemos trabajar hasta base 16.
*/
const digitos = "0123456789ABCDEF";



/* =========================================================
   FUNCIÓN: validarNumero
   ========================================================= */

/*
    Esta función verifica si un número realmente
    pertenece a la base seleccionada.

    Ejemplo:

    En base 2 solamente podemos utilizar:
    0 y 1.

    En base 8 podemos utilizar:
    0,1,2,3,4,5,6,7.

    En hexadecimal podemos utilizar:
    0-9 y A-F.
*/

function validarNumero(numero, base) {


    /*
        Convertimos el número a mayúsculas.

        Esto permite aceptar:

        a

        y

        A

        como el mismo símbolo.
    */
    numero = numero.toUpperCase();


    /*
        Si el usuario no escribió nada,
        devolvemos false.

        false significa "no es válido".
    */
    if (numero === "") {

        return false;

    }


    /*
        Recorremos cada carácter del número.

        Por ejemplo:

        numero = "1011"

        for revisará:

        1
        0
        1
        1
    */
    for (let caracter of numero) {


        /*
            Buscamos si el carácter existe
            dentro de nuestra cadena de dígitos.

            Ejemplo:

            digitos = "0123456789ABCDEF"

            Si caracter = "B",
            su posición será 11.
        */
        let valor = digitos.indexOf(caracter);


        /*
            Si indexOf devuelve -1,
            significa que el carácter
            no existe dentro de digitos.
        */
        if (valor === -1) {

            return false;

        }


        /*
            Verificamos si el valor del dígito
            es demasiado grande para la base.

            Ejemplo:

            Base 2:

            0 y 1 son válidos.

            2 ya no es válido.
        */
        if (valor >= base) {

            return false;

        }

    }


    /*
        Si llegó hasta aquí significa
        que todos los caracteres son válidos.
    */
    return true;

}



/* =========================================================
   FUNCIÓN: valorDigito
   ========================================================= */

/*
    Convierte un símbolo en su valor numérico.

    Ejemplos:

    "0" → 0
    "5" → 5
    "A" → 10
    "F" → 15
*/

function valorDigito(caracter) {


    /*
        Convertimos el carácter a mayúsculas
        y buscamos su posición dentro de digitos.
    */
    return digitos.indexOf(caracter.toUpperCase());

}



/* =========================================================
   FUNCIÓN: representarDigito
   ========================================================= */

/*
    Hace lo contrario de valorDigito.

    Recibe un número y devuelve su símbolo.

    Ejemplos:

    10 → A
    11 → B
    15 → F
*/

function representarDigito(valor) {

    return digitos[valor];

}



/* =========================================================
   FUNCIÓN: decimalABase
   ========================================================= */

/*
    Convierte un número decimal
    a cualquier base entre 2 y 16.

    Ejemplo:

    10 decimal → 1010 binario
*/

function decimalABase(numero, base) {


    /*
        Si el número es 0,
        simplemente devolvemos "0".
    */
    if (numero === 0) {

        return "0";

    }


    /*
        Aquí vamos a guardar el resultado.
    */
    let resultado = "";


    /*
        Repetimos mientras el número
        sea mayor que 0.
    */
    while (numero > 0) {


        /*
            Obtenemos el residuo de dividir
            el número entre la base.

            Ejemplo:

            10 % 2 = 0
        */
        let residuo = numero % base;


        /*
            Convertimos el residuo
            a su símbolo correspondiente.
        */
        let digito = representarDigito(residuo);


        /*
            Agregamos el nuevo dígito
            AL PRINCIPIO del resultado.

            Esto es importante porque
            las conversiones se construyen
            de derecha a izquierda.
        */
        resultado = digito + resultado;


        /*
            División entera.

            Math.floor elimina la parte decimal.

            Ejemplo:

            10 / 2 = 5

            5 / 2 = 2.5

            Math.floor(2.5) = 2
        */
        numero = Math.floor(numero / base);

    }


    /*
        Devolvemos el resultado final.
    */
    return resultado;

}



/* =========================================================
   FUNCIÓN: baseADecimal
   ========================================================= */

/*
    Convierte un número de cualquier base
    entre 2 y 16 a decimal.

    Ejemplo:

    1010 base 2 → 10 decimal
*/

function baseADecimal(numero, base) {


    /*
        Convertimos todo a mayúsculas.
    */
    numero = numero.toUpperCase();


    /*
        Aquí guardaremos el resultado.
    */
    let resultado = 0;


    /*
        Esta variable representa
        la potencia de la base.

        Comienza en 1 porque:

        base^0 = 1
    */
    let potencia = 1;


    /*
        Comenzamos desde el último carácter.

        Ejemplo:

        1010

        posiciones:

        1 0 1 0
        ↑ ↑ ↑ ↑
        3 2 1 0
    */
    for (let posicion = numero.length - 1;
         posicion >= 0;
         posicion--) {


        /*
            Obtenemos el valor numérico
            del carácter actual.
        */
        let valor = valorDigito(numero[posicion]);


        /*
            Aplicamos el valor posicional:

            valor × potencia
        */
        resultado += valor * potencia;


        /*
            Aumentamos la potencia.

            Ejemplo en base 2:

            1
            2
            4
            8
            16...
        */
        potencia *= base;

    }


    /*
        Regresamos el resultado decimal.
    */
    return resultado;

}



/* =========================================================
   FUNCIÓN: convertir
   ========================================================= */

/*
    Esta función conecta las dos funciones
    anteriores.

    Primero convierte:

    BASE ORIGEN → DECIMAL

    y después:

    DECIMAL → BASE DESTINO
*/

function convertir(numero, baseOrigen, baseDestino) {


    /*
        Primero convertimos el número
        de su base original a decimal.
    */
    let decimal = baseADecimal(numero, baseOrigen);


    /*
        Después convertimos ese decimal
        a la base que seleccionó el usuario.
    */
    return decimalABase(decimal, baseDestino);

}



/* =========================================================
   FUNCIÓN: realizarConversion
   ========================================================= */

/*
    Esta función se ejecuta cuando el usuario
    presiona el botón "Convertir".
*/

function realizarConversion() {


    /*
        Obtenemos el número escrito
        por el usuario.
    */
    let numero =
        document.getElementById("numeroConversion").value;


    /*
        Obtenemos la base de origen.
    */
    let baseOrigen =
        Number(document.getElementById("baseOrigen").value);


    /*
        Obtenemos la base de destino.
    */
    let baseDestino =
        Number(document.getElementById("baseDestino").value);


    /*
        Obtenemos el elemento donde
        mostraremos el resultado.
    */
    let resultado =
        document.getElementById("resultadoConversion");


    /*
        Eliminamos espacios al inicio y al final
        del número.
    */
    numero = numero.trim();


    /*
        Convertimos letras a mayúsculas.
    */
    numero = numero.toUpperCase();


    /*
        Comprobamos que el número sea válido.
    */
    if (!validarNumero(numero, baseOrigen)) {


        /*
            Mostramos un mensaje de error.
        */
        resultado.innerHTML =
            "❌ El número no es válido para la base seleccionada.";

        return;

    }


    /*
        Realizamos la conversión.
    */
    let numeroConvertido =
        convertir(numero, baseOrigen, baseDestino);


    /*
        Mostramos el resultado.
    */
    resultado.innerHTML =
        "Resultado: <strong>" +
        numeroConvertido +
        "</strong>";

}



/* =========================================================
   VALIDACIÓN DE NÚMEROS BINARIOS
   ========================================================= */

/*
    Esta función verifica específicamente
    que un número sea binario.

    En binario solamente existen:

    0
    1
*/

function validarBinario(numero) {


    /*
        Si está vacío, no es válido.
    */
    if (numero === "") {

        return false;

    }


    /*
        Recorremos cada carácter.
    */
    for (let caracter of numero) {


        /*
            Si el carácter no es 0 ni 1,
            el número no es binario.
        */
        if (caracter !== "0" && caracter !== "1") {

            return false;

        }

    }


    /*
        Si todo está correcto,
        devolvemos true.
    */
    return true;

}



/* =========================================================
   FUNCIÓN: realizarOperacion
   ========================================================= */

/*
    Esta función recibe el tipo de operación:

    "suma"

    "resta"

    "multiplicacion"

    "division"
*/

function realizarOperacion(tipoOperacion) {


    /*
        Obtenemos el primer número.
    */
    let numero1 =
        document.getElementById("numero1").value.trim();


    /*
        Obtenemos el segundo número.
    */
    let numero2 =
        document.getElementById("numero2").value.trim();


    /*
        Obtenemos el espacio donde
        aparecerá el resultado.
    */
    let resultado =
        document.getElementById("resultadoOperacion");


    /*
        Convertimos ambos números
        a mayúsculas por seguridad.
    */
    numero1 = numero1.toUpperCase();

    numero2 = numero2.toUpperCase();


    /*
        Validamos el primer número.
    */
    if (!validarBinario(numero1)) {

        resultado.innerHTML =
            "❌ El primer número no es binario.";

        return;

    }


    /*
        Validamos el segundo número.
    */
    if (!validarBinario(numero2)) {

        resultado.innerHTML =
            "❌ El segundo número no es binario.";

        return;

    }


    /*
        Convertimos el primer número
        binario a decimal.
    */
    let decimal1 =
        baseADecimal(numero1, 2);


    /*
        Convertimos el segundo número
        binario a decimal.
    */
    let decimal2 =
        baseADecimal(numero2, 2);


    /*
        Variable donde guardaremos
        el resultado decimal.
    */
    let resultadoDecimal;


    /* =====================================================
       SUMA
       ===================================================== */

    if (tipoOperacion === "suma") {


        /*
            Sumamos ambos valores decimales.
        */
        resultadoDecimal =
            decimal1 + decimal2;

    }


    /* =====================================================
       RESTA
       ===================================================== */

    else if (tipoOperacion === "resta") {


        /*
            Restamos el segundo número
            al primero.
        */
        resultadoDecimal =
            decimal1 - decimal2;

    }


    /* =====================================================
       MULTIPLICACIÓN
       ===================================================== */

    else if (tipoOperacion === "multiplicacion") {


        /*
            Multiplicamos los dos valores.
        */
        resultadoDecimal =
            decimal1 * decimal2;

    }


    /* =====================================================
       DIVISIÓN
       ===================================================== */

    else if (tipoOperacion === "division") {


        /*
            Primero verificamos que el divisor
            no sea cero.
        */
        if (decimal2 === 0) {

            resultado.innerHTML =
                "❌ No se puede dividir entre cero.";

            return;

        }


        /*
            División entera para obtener
            el cociente.
        */
        let cociente =
            Math.floor(decimal1 / decimal2);


        /*
            El operador % obtiene el residuo.
        */
        let residuo =
            decimal1 % decimal2;


        /*
            Convertimos el cociente
            nuevamente a binario.
        */
        let cocienteBinario =
            decimalABase(cociente, 2);


        /*
            Convertimos el residuo
            nuevamente a binario.
        */
        let residuoBinario =
            decimalABase(residuo, 2);


        /*
            Mostramos el resultado.
        */
        resultado.innerHTML =
            "Cociente: <strong>" +
            cocienteBinario +
            "</strong><br>" +
            "Residuo: <strong>" +
            residuoBinario +
            "</strong>";

        return;

    }


    /*
        Convertimos el resultado decimal
        nuevamente a binario.
    */
    let resultadoBinario;


    /*
        Verificamos si el resultado
        de la resta es negativo.
    */
    if (resultadoDecimal < 0) {


        /*
            Convertimos el valor absoluto
            a binario.

            Math.abs elimina temporalmente
            el signo negativo.
        */
        resultadoBinario =
            "-" +
            decimalABase(Math.abs(resultadoDecimal), 2);

    }


    else {


        /*
            Si no es negativo,
            simplemente lo convertimos.
        */
        resultadoBinario =
            decimalABase(resultadoDecimal, 2);

    }


    /*
        Mostramos el resultado final.
    */
    resultado.innerHTML =
        "Resultado: <strong>" +
        resultadoBinario +
        "</strong>";

}