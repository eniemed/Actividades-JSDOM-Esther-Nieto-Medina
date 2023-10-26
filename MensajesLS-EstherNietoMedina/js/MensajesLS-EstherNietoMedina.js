/*ESTHER NIETO MEDINA. EJERCICIO 21. LOCAL STORAGE. (Con comentarios como apuntes del proceso que he seguido)*/

//Selectores

const texto = document.querySelector("textarea")
const boton = document.querySelector(".button") //recoge el botón de agregar que ya está puesto en el html
const listaMensajes = document.querySelector("#lista-mensajes") //div donde voy a meter los mensajes para mostrarlos

let lista = JSON.parse(localStorage.getItem("Mensaje")) || [] //una lista que toma los valores del localStorage con la clave de Mensaje o si no hay nada toma el valor de una lista vacía para evitar un error de null

boton.addEventListener("click", (e) => { //evento para que cuando se haga click en el botón de agregar preventa que la pag se recargue todo el rato y llame a añadirMensaje

    e.preventDefault()
    anadirMensaje()

})

listaMensajes.addEventListener("click", eliminarMensaje) //evento que llama a eliminarMensaje cuando se hace click en el div (más adelante se establece que la función solo borra si el click es en la X con la clase borrar-mensaje)



//Funciones


function anadirMensaje(e) {

    const mensaje = texto.value //coge el texto en sí del textarea. Si no lo hago así no me coge ningún texto

    if (mensaje.trim() != "") { //esto evita que el usuario introduzca valores vacíos
        
        lista.push(mensaje)
        localStorage.setItem("Mensaje", JSON.stringify(lista)) //introduce la lista en el localStorage parseado a string porque es lo único que puede recibir
        mostrarMensaje() //muestra por pantalla los mensajes y tiene preventDefault
    } else {
        mostrarMensaje() //si el mensaje es un valor vacío sigue mostrando la lista tal cual está y previendo los valores por defecto
    }
    
}

function mostrarMensaje() {
    let contadorID = 0 //este contador le va a asignar un índice a cada mensaje que me servirá más adelante para poder eliminarlos de 1 en 1
    limpiarHTML() //llama a la función que limpia el html
    if (mensaje) {
        texto.value = '' //vacia el cuadro de texto cada vez que se envía un mensaje

        
        lista.forEach(element => { //este bucle crea una tabla con un enlace, se le añade la clase, el id y el contenido (X)
            const fila = document.createElement("tr")
            const enlace = document.createElement("a")

            enlace.href = "#" //valor por defecto vacío
            enlace.classList.add("borrar-mensaje")
            enlace.setAttribute("data-id", contadorID)
            enlace.textContent = "X"

            fila.innerHTML = `
                <td> ${element} </td>
                <td></td>
            `

            fila.lastElementChild.appendChild(enlace) //en el último elemento añade el enlace
            listaMensajes.appendChild(fila) //añade todo al contenedor para que se muestre por pantalla
            contadorID++ //suma al contador para que el siguiente elemento tenga un id diferente
        
        });
    }
}


mostrarMensaje() //muestra continuamente los mensajes

function limpiarHTML() { //limpia todo el contenido de listaMensajes

    while (listaMensajes.firstChild) {
        listaMensajes.firstChild.remove()
    }
}


function eliminarMensaje(e){
    e.preventDefault()

    if (e.target.classList.contains("borrar-mensaje")) { //para que solo funcione si pulsa en el botón que contiene la clase borrar-mensaje
        const elementoID = e.target.getAttribute("data-id"); //recupera el id del elemento pulsado

        lista = lista.filter((elemento, contadorID) => contadorID !== parseInt(elementoID)) //actualiza la lista filtrando los elementos necesarios
        localStorage.setItem("Mensaje", JSON.stringify(lista)); //añade la lista parseada a string bajo la clave de Mensaje
        mostrarMensaje();
    }
}




