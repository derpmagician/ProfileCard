// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
//Carga el contenido a coger despues de cargarse el html
document.addEventListener("DOMContentLoaded", () => {
    const random = getRandomInt(1, 898)
    fetchData(random)
})

function myFunction() {
    const random = getRandomInt(1, 898)
    //document.getElementById("demo").innerHTML = random;
    fetchData(random)
  }

const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)//alt 96 ``
        const data = await res.json()

        console.log(data)

        const pokemon ={
            img: data.sprites.front_default,
            nombre: data.name,
            id: data.id,
            hp: data.stats[0].base_stat,
            atk: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            atks: data.stats[3].base_stat,
            defs: data.stats[4].base_stat,
            spd: data.stats[5].base_stat,
        }

        pintarCard(pokemon)
    }    catch(error){
        console.log(error)
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon)

    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span> Nro ${pokemon.id}</span>`
    clone.querySelector('.card-body-text').innerHTML = `Salud: ${pokemon.hp}`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.atk
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.def
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.atks
    clone.querySelectorAll('.card-footer-social h3')[3].textContent = pokemon.defs
    clone.querySelectorAll('.card-footer-social h3')[4].textContent = pokemon.spd

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}
