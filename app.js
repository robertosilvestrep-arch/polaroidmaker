const world = document.getElementById("world")
let selected = null

document.getElementById("upload").addEventListener("change", e => {

    for (let file of e.target.files){

        const reader = new FileReader()

        reader.onload = ev => createPhoto(ev.target.result)

        reader.readAsDataURL(file)

    }

})

function createPhoto(src){

    const photo = document.createElement("div")
    photo.className = "photo"
    photo.style.left = Math.random()*500 + 100 + "px"
    photo.style.top = Math.random()*300 + 100 + "px"

    photo.innerHTML = `<img src="${src}">`

    world.appendChild(photo)

    selectPhoto(photo)
    makeDrag(photo)

}

function selectPhoto(photo){

    photo.onclick = e => {

        e.stopPropagation()

        document.querySelectorAll(".photo").forEach(p=>p.style.outline="none")

        selected = photo
        photo.style.outline = "3px solid #00f0ff"

    }

}

world.onclick = () => {
    selected = null
    document.querySelectorAll(".photo").forEach(p=>p.style.outline="none")
}

/* DRAG PROFISSIONAL */

function makeDrag(el){

    let startX,startY,origX,origY,drag=false

    el.addEventListener("mousedown", e=>{

        drag = true

        startX = e.clientX
        startY = e.clientY

        origX = parseFloat(el.style.left)
        origY = parseFloat(el.style.top)

        el.style.cursor="grabbing"

    })

    window.addEventListener("mousemove", e=>{

        if(!drag) return

        let dx = e.clientX - startX
        let dy = e.clientY - startY

        el.style.left = origX + dx + "px"
        el.style.top = origY + dy + "px"

    })

    window.addEventListener("mouseup", ()=>{
        drag=false
        el.style.cursor="grab"
    })

}

/* CATEGORIAS */

document.querySelectorAll(".sidebar button")[0].onclick = ()=>{
    world.style.background="#05070c"
}

document.querySelectorAll(".sidebar button")[1].onclick = ()=>{
    world.style.background="url(https://i.imgur.com/7QZ6XKQ.png)"
    world.style.backgroundSize="cover"
}

document.querySelectorAll(".sidebar button")[5].onclick = ()=>{
    world.style.background="#222"
}

/* MOLDURAS */

document.querySelectorAll(".rightPanel button")[0].onclick = ()=>{
    if(!selected) return
    selected.style.border="10px solid white"
}

document.querySelectorAll(".rightPanel button")[1].onclick = ()=>{
    if(!selected) return
    selected.style.border="4px solid cyan"
    selected.style.boxShadow="0 0 30px cyan"
}

document.querySelectorAll(".rightPanel button")[2].onclick = ()=>{
    if(!selected) return
    selected.style.backdropFilter="blur(10px)"
    selected.style.background="rgba(255,255,255,.2)"
}