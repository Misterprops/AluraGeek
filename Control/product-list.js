import { Services } from "../Services/connector.js";

const table = document.querySelector("[data-table]");
let categorias = [];
const paramCat = getParameterByName('categoria');
const paramSearch = getParameterByName('search');

Services.lista().then((data) =>{
    data.forEach((datos) => {
        if(paramCat != ""){
            if(paramCat == datos.categoria){
                if(categorias.length == 0){
                    categorias.push([datos.categoria, datos]);
                }else{
                    categorias[0].push(datos);
                }
            }
        }else if(paramSearch != ""){
            if(datos.name.toLowerCase().includes(paramSearch.toLowerCase())){
                agregar(datos);
            }
        }else{
            agregar(datos);
        }
    });
    console.log(categorias);
    constructor();
}).catch((error) => alert("Error de data" + error));

function agregar (datos){
    if(categorias.length == 0){
        categorias.push([datos.categoria, datos]);
    }else{
        let band = false;
        categorias.forEach(dupla => {
            if(dupla[0]==datos.categoria){
                categorias[categorias.indexOf(dupla)].push(datos);
                band = true;
            }
        });
        if (!band){
            categorias.push([datos.categoria, datos]);
        }
    }
}

function constructor (){
    let pantalla = screen.width;
    let colspan = 0;
    if(pantalla <= 480){
        colspan = 1;
    }else if(pantalla <= 768){
        colspan = 2;
    }else{
        colspan = 3;
    }
    categorias.forEach((array)=>{
        const tabla = document.createElement("table");
        const contHead = `<thead>
            <tr class="table_cabecera">
                <th data-th colspan="${colspan}">${array[0]}</th>
                <th colspan="${colspan}"><a href="https://misterprops.github.io/AluraGeek/index.html?categoria=${array[0]}">Ver mas &#129050;</a></th>
            </tr>
        </thead>`;
        let contador = 0;
        let contbody = `<tbody><tr>`;
        for (let i=1; i<array.length; i++){
            contbody +=`<td>
                <button class="producto" type="button" id="${array[i].id}">
                    <img src="${array[i].imageUrl}">
                </button>
                <h1 class="prod_name">${array[i].name}</h1>
                <h1 class="prod_price">${array[i].price}</h1>
            </td>`;
            contador++;
            if(pantalla<=768){
                if(contador%2 == 0 && pantalla<=480){
                    contbody +="</tr><tr>";
                    if(contador == 4 && paramCat == ""){
                        break;
                    }else if(paramCat != "" && contador%4 == 0){
                        contbody +="</tr><tr>";
                    }
                }else if(contador==4 && paramCat == ""){
                    break;
                }else if(paramCat != "" && contador%4 == 0){
                    contbody +="</tr><tr>";
                }
            }else if(contador==6 && paramCat == ""){
                break;
            }else if(paramCat != "" && contador%6 == 0){
                contbody +="</tr><tr>";
            }
        }
        contbody += `</tr></tbody>`;
        tabla.innerHTML = contHead;
        tabla.innerHTML += contbody;
        const btn = tabla.querySelectorAll("button");
        btn.forEach((boton)=>{
            boton.addEventListener("click", () =>{
                const id = boton.id;
                console.log("entrando"+id);
            })
        });
        table.appendChild(tabla);
    });
}

const btnBuscador = document.getElementById("search");
btnBuscador.addEventListener("click", (e) =>{
    e.preventDefault();
    location.href=`https://misterprops.github.io/AluraGeek/index.html?search=${document.getElementById("search_input").value}`;
});

const btnBanner = document.getElementById("banner_btn");
btnBanner.addEventListener("click",()=>{
    location.href="https://misterprops.github.io/AluraGeek/index.html?categoria=Figuras";
});

function getParameterByName(name) {
    try {
        let valores = location.search.split("=");
        valores[0] = valores[0].replace("?","");
        valores[1] = valores[1].replaceAll("%20"," ");
        return valores[0]===name?valores[1]:"";
    } catch (error) {
        return "";
    }
    
}