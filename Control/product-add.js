import { Services } from "../Services/connector.js";

const param = getParameterByName('select');
const prod = document.querySelector("[add-prod]");
const btn = prod.querySelector("button");
const inputs = prod.querySelectorAll("input");
const txta = prod.querySelector("textarea");

if(param==""){
    btn.addEventListener("click", (e) =>{

        let imageUrl = inputs[0].value;
        let categoria = inputs[1].value;
        let nombre = inputs[2].value;
        let precio = inputs[3].value;

        if(validator(imageUrl) && validator(categoria) && validator(nombre) && validator(precio)){
            e.preventDefault();
            Services.crear(nombre,imageUrl,"$"+precio,txta.value,categoria).then(() =>{
                location.href="https://misterprops.github.io/AluraGeek/productos.html"
            }).catch((error) => alert(error));
        }
    });
}else{
    const titulo = document.querySelector("[add_titulo]");
    titulo.innerHTML="Modificar producto"
    Services.detalle(param).then((elemento)=>{
        const precio = elemento.price.substring(1);

        inputs[0].value=elemento.imageUrl;
        inputs[1].value=elemento.categoria;
        inputs[2].value=elemento.name;
        inputs[3].value=parseInt(precio);
        txta.value=elemento.description;

        btn.innerHTML="Actualizar producto";
    }).catch((e)=>{console.log(e)});
    
    btn.addEventListener("click",(e) =>{
        console.log(inputs);
        if(validator(inputs[0].value) && validator(inputs[1].value) && validator(inputs[2].value) && validator(inputs[3].value)){
            e.preventDefault();
            Services.actualizar(inputs[2].value,inputs[0].value,"$"+inputs[3].value,txta.value,inputs[1].value,param).then(() =>{
                location.href="productos.html"
            }).catch((error) => alert(error));
        }
    });
}

const validator = (cadena) =>{
    if(cadena==""){
        return false;
    }else{
        return true;
    }
}

function getParameterByName(name) {
    let valores = location.search.split("=");
    return valores[0]===""?"":valores[1];
}

const btnBuscador = document.getElementById("search");
btnBuscador.addEventListener("click", (e) =>{
    e.preventDefault();
    location.href=`index.html?search=${document.getElementById("search_input").value}`;
});