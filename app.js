const upload = document.getElementById("upload");

const mural = document.getElementById("photos");
const livre = document.getElementById("canvasLivre");
const album = document.getElementById("albumArea");

let dragged = null;
let offsetX = 0;
let offsetY = 0;

upload.addEventListener("change", e => {

    [...e.target.files].forEach(file => {

        const reader = new FileReader();

        reader.onload = ev => {
            createPhoto(ev.target.result);
        };

        reader.readAsDataURL(file);

    });

});

function createPhoto(src){

    const photo = document.createElement("div");
    photo.className = "photo";
    photo.innerHTML = `<img src="${src}">`;

    photo.style.left = Math.random()*400 + "px";
    photo.style.top = Math.random()*500 + "px";

    photo.dataset.rotate = 0;

    enableDrag(photo);
    enableControls(photo);

    mural.appendChild(photo);

}

function enableDrag(el){

    el.addEventListener("mousedown", e=>{
        dragged = el;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        el.style.zIndex = 9999;
    });

}

document.addEventListener("mousemove", e=>{

    if(!dragged) return;

    dragged.style.left = (e.pageX - offsetX) + "px";
    dragged.style.top = (e.pageY - offsetY) + "px";

});

document.addEventListener("mouseup", e=>{

    if(!dragged) return;

    const x = e.clientX;
    const y = e.clientY;

    const dropLivre = livre.getBoundingClientRect();
    const dropAlbum = album.getBoundingClientRect();

    if(x > dropLivre.left && x < dropLivre.right &&
       y > dropLivre.top && y < dropLivre.bottom){

        livre.appendChild(dragged);

    }

    if(x > dropAlbum.left && x < dropAlbum.right &&
       y > dropAlbum.top && y < dropAlbum.bottom){

        album.appendChild(dragged);

        dragged.style.position = "relative";
        dragged.style.left = "0px";
        dragged.style.top = "0px";

    }

    dragged.style.zIndex = 1;
    dragged = null;

});

function enableControls(el){

    el.addEventListener("dblclick", ()=>{

        let r = Number(el.dataset.rotate);
        r += 15;

        el.dataset.rotate = r;
        el.style.transform = `rotate(${r}deg)`;

    });

    el.addEventListener("contextmenu", e=>{
        e.preventDefault();

        if(confirm("Excluir foto?")){
            el.remove();
        }
    });

}

function showTab(id){

    document.querySelectorAll(".tab")
        .forEach(t => t.classList.remove("active"));

    document.getElementById(id)
        .classList.add("active");

}
