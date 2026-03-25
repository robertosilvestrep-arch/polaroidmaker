const world = document.getElementById("world")

let objects = []

document.getElementById("upload").addEventListener("change", e => {

    const files = e.target.files

    for (let file of files){

        const reader = new FileReader()

        reader.onload = function(ev){

            createPhoto(ev.target.result)

        }

        reader.readAsDataURL(file)

    }

})

function createPhoto(src){

    const photo = document.createElement("div")

    photo.className = "photo"

    photo.style.left = (window.innerWidth/2) + "px"
    photo.style.top = (window.innerHeight/2) + "px"

    photo.innerHTML = `<img src="${src}">`

    makeDraggable(photo)

    world.appendChild(photo)

}

function makeDraggable(el){

    let offsetX = 0
    let offsetY = 0
    let dragging = false

    el.addEventListener("mousedown", e => {

        dragging = true

        offsetX = e.offsetX
        offsetY = e.offsetY

    })

    window.addEventListener("mousemove", e => {

        if(!dragging) return

        el.style.left = (e.clientX - offsetX) + "px"
        el.style.top = (e.clientY - offsetY) + "px"

    })

    window.addEventListener("mouseup", () => dragging = false)

}