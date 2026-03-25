const world = document.getElementById("world")
const upload = document.getElementById("upload")

let selected = null
let dragTarget = null
let offsetX = 0
let offsetY = 0

/* UPLOAD */

upload.addEventListener("change", e => {

    Array.from(e.target.files).forEach(file => {

        const reader = new FileReader()

        reader.onload = ev => {

            const photo = document.createElement("div")
            photo.className = "photo"

            photo.style.left = 200 + Math.random()*300 + "px"
            photo.style.top = 100 + Math.random()*200 + "px"

            photo.innerHTML = `<img src="${ev.target.result}">`

            world.appendChild(photo)

        }

        reader.readAsDataURL(file)

    })

})

/* SELEÇÃO */

world.addEventListener("click", e => {

    const p = e.target.closest(".photo")

    document.querySelectorAll(".photo").forEach(el=>{
        el.style.outline="none"
    })

    if(p){
        selected = p
        p.style.outline="3px solid cyan"
    }else{
        selected=null
    }

})

/* DRAG PROFISSIONAL GLOBAL */

world.addEventListener("mousedown", e => {

    const p = e.target.closest(".photo")

    if(!p) return

    dragTarget = p

    offsetX = e.clientX - p.offsetLeft
    offsetY = e.clientY - p.offsetTop

})

window.addEventListener("mousemove", e => {

    if(!dragTarget) return

    dragTarget.style.left = e.clientX - offsetX + "px"
    dragTarget.style.top = e.clientY - offsetY + "px"

})

window.addEventListener("mouseup", ()=> dragTarget = null)

/* CATEGORIAS */

document.querySelector(".sidebar").addEventListener("click", e => {

    if(e.target.tagName !== "BUTTON") return

    const txt = e.target.innerText

    if(txt === "Calendário"){

        world.style.background = "white"

        const grid = document.createElement("div")
        grid.style.position="absolute"
        grid.style.inset="0"
        grid.style.backgroundImage =
        "linear-gradient(#ddd 1px,transparent 1px),linear-gradient(90deg,#ddd 1px,transparent 1px)"
        grid.style.backgroundSize="80px 80px"

        world.innerHTML=""
        world.appendChild(grid)

    }

    if(txt === "Mural"){
        world.style.background="#222"
    }

})

/* MOLDURAS */

document.querySelector(".rightPanel").addEventListener("click", e => {

    if(e.target.tagName !== "BUTTON") return
    if(!selected) return

    const txt = e.target.innerText

    if(txt === "Polaroid"){
        selected.style.border="12px solid white"
    }

    if(txt === "Neon"){
        selected.style.border="4px solid cyan"
        selected.style.boxShadow="0 0 40px cyan"
    }

    if(txt === "Glass"){
        selected.style.background="rgba(255,255,255,.2)"
        selected.style.backdropFilter="blur(6px)"
    }

})