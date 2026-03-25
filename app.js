const world = document.getElementById("world")

document.getElementById("upload").addEventListener("change", e => {

    for (let file of e.target.files){

        const reader = new FileReader()

        reader.onload = ev => {

            createPhoto(ev.target.result)

        }

        reader.readAsDataURL(file)

    }

})

function createPhoto(src){

    const photo = document.createElement("div")

    photo.className = "photo"

    photo.style.left = world.clientWidth/2 + "px"
    photo.style.top = world.clientHeight/2 + "px"

    photo.innerHTML = `<img src="${src}">`

    makeDrag(photo)

    world.appendChild(photo)

}

function makeDrag(el){

    let down = false
    let offX = 0
    let offY = 0

    el.onmousedown = e => {

        down = true

        offX = e.offsetX
        offY = e.offsetY

    }

    window.onmousemove = e => {

        if(!down) return

        el.style.left = (e.clientX - 220 - offX) + "px"
        el.style.top = (e.clientY - offY) + "px"

    }

    window.onmouseup = () => down = false

}

/* EXPORT */

function exportA4Portrait(){

html2canvas(world).then(canvas=>{
const img = canvas.toDataURL("image/png")
const pdf = new jspdf.jsPDF("p","mm","a4")
pdf.addImage(img,"PNG",0,0,210,297)
pdf.save("mural.pdf")
})

}

function exportA4Landscape(){

html2canvas(world).then(canvas=>{
const img = canvas.toDataURL("image/png")
const pdf = new jspdf.jsPDF("l","mm","a4")
pdf.addImage(img,"PNG",0,0,297,210)
pdf.save("mural.pdf")
})

}

function exportPDF(){

html2canvas(world).then(canvas=>{
const img = canvas.toDataURL("image/png")
const pdf = new jspdf.jsPDF()
pdf.addImage(img,"PNG",10,10)
pdf.save("mural.pdf")
})

}