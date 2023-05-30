import { Services } from "../Services/connector.js";

const user = document.querySelector("[user]");
const password = document.querySelector("[password]");
const submit = document.querySelector("[submit]");

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    Services.usuarios().then((usuario)=>{
        usuario.forEach(datos => {
            if(datos.name==user.value && datos.password==password.value){
                location.href="https://misterprops.github.io/AluraGeek/productos.html"
            }else{
                location.href="https://misterprops.github.io/AluraGeek/login.html"
            }
        });
    }).catch((e) => alert(e));
});

const btnBuscador = document.getElementById("search");
btnBuscador.addEventListener("click", (e) =>{
    e.preventDefault();
    location.href=`index.html?search=${document.getElementById("search_input").value}`;
});