let atras = document.getElementById("atras")
let siguiente = document.getElementById("siguiente")
let buscarPokemon = document.getElementById("tarjetas")
const informacion = document.getElementById("informacion")
let paginaActual = 1
function pokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        .then(response => response.json())
        .then(data => data.results.forEach((recorrer) => {
            let contenedor = document.createElement('div');
            contenedor.classList.add("pokemon")
            contenedor.textContent = recorrer.name
            buscarPokemon.appendChild(contenedor)
            contenedor.addEventListener('click', () => {
                informacion.textContent = "";
                fetch(recorrer.url)
                    .then(datosInfo => datosInfo.json())
                    .then(datosInfo => {
                        let textoInformacion = document.createElement('p')
                        informacion.appendChild(textoInformacion)
                        textoInformacion.textContent = 'Pokemon seleccionado: \n' + recorrer.name + '\n' + '\n' + 'Habilidad: \n' + datosInfo.abilities[0].ability.name
                        let peso = document.createElement('p')
                        peso.textContent = 'Peso: ' + datosInfo.weight / 10 + " kg"
                        informacion.appendChild(peso)
                        let altura = document.createElement('p')
                        altura.textContent = 'Altura: ' + datosInfo.height / 10 + " mts"
                        informacion.appendChild(altura)
                    })
            })
            fetch(recorrer.url)
                .then(respuestaUrl => respuestaUrl.json())
                .then(datosUrl => {
                    let imagen = document.createElement('img')
                    contenedor.appendChild(imagen)
                    imagen.setAttribute('src', datosUrl.sprites.front_default)
                })
        })
        )
        .catch((error) => { console.log(error, 'cargando') })
}
siguiente.addEventListener('click', () => {
    paginaActual++
    let offset = (paginaActual - 1) * 20
    pokemon(offset)
    buscarPokemon.textContent = ""
    pagina.textContent = 'pagina ' + paginaActual
})
atras.addEventListener('click', () => {
    paginaActual--
    offset = (paginaActual - 1) * 20;
    if (paginaActual === 0) {
        paginaActual = 1
        atras.removeEventListener()
    }
    pokemon(offset)
    buscarPokemon.textContent = ""
    pagina.textContent = 'pagina ' + paginaActual
})
pagina.textContent = 'pagina ' + paginaActual
pokemon(0)