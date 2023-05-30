import { Services } from "../Services/connector.js";

const table = document.querySelector("[data-table]");

Services.lista().then((data) => {
    let pantalla = screen.width;
    let colspan = 0;
    if (pantalla <= 480) {
        colspan = 1;
    } else if (pantalla <= 768) {
        colspan = 2;
    } else {
        colspan = 3;
    }
    const tabla = document.createElement("table");
    const contHead = `<thead>
        <tr>
            <th data-th colspan="${colspan}"><h1>Todos los productos</h1></th>
            <th colspan="${colspan}"><a href="agregar.html"><button class="add">Agregar producto</button></a></th>
        </tr>
    </thead>`;
    let contador = 0;
    let contbody = `<tbody><tr>`;
    data.forEach((datos) => {
        contbody += `<td>
            <div class="productoAll" style="background-image: url(${datos.imageUrl});">
                <button id="${datos.id}" value="deletear">
                    <img src="../Media/icons8-full-trash-50.png">
                </button>
                <button id="${datos.id}" value="modificar">
                    <img src="../Media/icons8-pencil-50.png">
                </button>
            </div>
            <h1>${datos.name}</h1>
            <h1>${datos.price}</h1>
        </td>`;
        contador++;
        if (pantalla <= 768) {
            if (contador % 2 == 0 && pantalla <= 480) {
                contbody += "</tr><tr>";
            }else if (contador % 4 == 0) {
                contbody += "</tr><tr>";
            }
        } else if (contador % 6 == 0) {
            contbody += "</tr><tr>";
        }
    });
    contbody += `</tr></tbody>`;
    tabla.innerHTML = contHead;
    tabla.innerHTML += contbody;
    const btn = tabla.querySelectorAll("button");
    btn.forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = boton.id;
            if (boton.value == "deletear") {
                deletear(id);
            } else if (boton.value == "modificar") {
                actualizar(id);
            }
        })
    });
    table.appendChild(tabla);
}).catch((error) => alert("Error de data" + error));

function deletear(id) {
    Services.eliminar(id);
}

function actualizar(id) {
    location.href = `https://misterprops.github.io/AluraGeek/agregar.html?select=${id}`;
}

const btnBuscador = document.getElementById("search");
btnBuscador.addEventListener("click", (e) =>{
    e.preventDefault();
    location.href=`https://misterprops.github.io/AluraGeek/index.html?search=${document.getElementById("search_input").value}`;
});