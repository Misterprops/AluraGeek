const lista = () => fetch("http://localhost:3000/productos").then(respuesta => respuesta.json());
const usuarios = () => fetch("http://localhost:3000/usuarios").then(respuesta => respuesta.json());

const crear = (name, imageUrl, price, description, categoria) => fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name, imageUrl, price, description, categoria, id: uuid.v4()})
});

const eliminar = (id) => fetch(`http://localhost:3000/productos/${id}`,{
    method: "DELETE"
});

const detalle = (id) => fetch(`http://localhost:3000/productos/${id}`).then(respuesta => respuesta.json());

const actualizar = (name, imageUrl, price, description, categoria, id) => fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name, imageUrl, price, description, categoria, id})
}).then().catch(err => console.log(err));

export const Services = {
    lista,
    usuarios,
    eliminar,
    crear,
    detalle,
    actualizar
};