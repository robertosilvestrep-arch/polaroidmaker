const upload = document.getElementById("upload");
const photos = document.getElementById("photos");
const livre = document.getElementById("canvasLivre");

upload.onchange = e=>{
[...e.target.files].forEach(file=>{
const reader = new FileReader();
reader.onload = ev=>{
createPhoto(ev.target.result);
};
reader.readAsDataURL(file);
});
};

function createPhoto(src){

const div = document.createElement("div");
div.className="photo";
div.draggable=true;

div.innerHTML=`<img src="${src}">`;

div.style.left = Math.random()*450+"px";
div.style.top = Math.random()*600+"px";

div.addEventListener("dragstart", dragStart);

photos.appendChild(div);
}

function dragStart(e){
e.dataTransfer.setData("id","");
window.dragged = e.target;
}

document.addEventListener("dragover", e=>e.preventDefault());

document.addEventListener("drop", e=>{
if(window.dragged){
window.dragged.style.left = e.pageX - 100 +"px";
window.dragged.style.top = e.pageY - 120 +"px";
}
});

function showTab(id){
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
document.getElementById(id).classList.add("active");
}