const upload = document.getElementById("upload");
const photos = document.getElementById("photos");
const livre = document.getElementById("canvasLivre");
const album = document.getElementById("albumArea");

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
div.innerHTML=`<img src="${src}">`;

div.style.left = Math.random()*450+"px";
div.style.top = Math.random()*600+"px";
div.dataset.rotate=0;

enableDrag(div);
enableControls(div);

photos.appendChild(div);
}

function enableDrag(el){

let offsetX, offsetY, dragging=false;

el.onmousedown = e=>{
dragging=true;
offsetX = e.offsetX;
offsetY = e.offsetY;
el.style.zIndex=999;
};

document.onmousemove = e=>{
if(!dragging) return;

el.style.left = e.pageX-offsetX+"px";
el.style.top = e.pageY-offsetY+"px";
};

document.onmouseup = ()=>{
dragging=false;
};
}

function enableControls(el){

el.ondblclick = ()=>{
let r = Number(el.dataset.rotate);
r+=15;
el.dataset.rotate=r;
el.style.transform=`rotate(${r}deg)`;
};

el.oncontextmenu = e=>{
e.preventDefault();
if(confirm("Excluir foto?")){
el.remove();
}
};

}

function showTab(id){
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
document.getElementById(id).classList.add("active");
}
