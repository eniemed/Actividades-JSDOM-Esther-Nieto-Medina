//Selectores 

const carrito = document.querySelector("#carrito") //# es nombre del id, no es una clase que sería con .

const contenedorCarrito = document.querySelector("#lista-carrito tbody") //lista con una tabla dentro que almacena los componentes de lo que llevará dentro el carrito

const vaciarCarritoBTN = document.querySelector("#vaciar-carrito")

//contenedor con todos los cursos
const listaCursos = document.querySelector("#lista-cursos")

//Variables

let articulosCarrito = []

//Listeners
//solo uno en lista cursos para ver dónde el usuario hace click, no hace falta uno para cada elemento.
//es más ordenado en una función llamarlos, pero también se pueden dejar fuera

cargarEventListeners() //puede llamarse antes de definir la función porque NO es de flecha, es normal. JS primero lee entero el script y luego lo ejecuta, por eso funciona

function cargarEventListeners() {
    listaCursos.addEventListener("click", anadirCurso) //la ñ no da problema cuando son nombres de funciones, variables, etc. Pero no es lo ideal dejarla
    carrito.addEventListener("click", eliminarCurso)

    vaciarCarritoBTN.addEventListener("click", () => {
        articulosCarrito = []
        limpiarHTML()
        localStorage.removeItem("Articulos")
    })

}


//Funciones


function eliminarCurso(e){
    if (e.target.classList.contains("borrar-curso")) {
        const cursoID = e.target.getAttribute("data-id")

        articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoID)
        carritoHTML(articulosCarrito)
        localStorage.setItem("Articulos", JSON.stringify(articulosCarrito))
    }
}

function anadirCurso(e) {
    
    e.preventDefault() //el botón tiene una referencia vacía, por lo que se va hacia arriba la pag, para que no haga eso usamos el preventDefault que previene valores por defecto
    
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
        localStorage.setItem("Articulos", JSON.stringify(articulosCarrito))
        
    }

}

//esta funcion va a leer la info del curso que añadimos al carrito, que será un objeto cada curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector("img").src, //curso ya tengo la estructura html completa, por eso en vez de document puedo usar curso directamente
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    //Revisamos si ya existe
    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id)

    if (existe) {
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            }
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso] 
    }

    carritoHTML(articulosCarrito) 
    
}

function carritoHTML() { //función que imprime el carrito

    limpiarHTML()

    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr")
        row.innerHTML = `

            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X
            </td>
        `
        contenedorCarrito.appendChild(row)
    })
    
}

function limpiarHTML() {
    //contenedorCarrito.innerHTML = "" //Esto hace lo mismo que el while pero es menos eficiente

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove()
    }
}






