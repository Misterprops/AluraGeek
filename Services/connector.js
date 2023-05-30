const lista = () => fetch("http://my-json-server.typicode.com/Misterprops/aluraGeek/productos").then(respuesta => respuesta.json());
const usuarios = () => fetch("http://my-json-server.typicode.com/Misterprops/aluraGeek/usuarios").then(respuesta => respuesta.json());

const crear = (name, imageUrl, price, description, categoria) => fetch("http://my-json-server.typicode.com/Misterprops/aluraGeek/productos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name, imageUrl, price, description, categoria, id: uuid.v4()})
});

const eliminar = (id) => fetch(`http://my-json-server.typicode.com/Misterprops/aluraGeek/productos/${id}`,{
    method: "DELETE"
});

const detalle = (id) => fetch(`http://my-json-server.typicode.com/Misterprops/aluraGeek/productos/${id}`).then(respuesta => respuesta.json());

const actualizar = (name, imageUrl, price, description, categoria, id) => fetch(`http://my-json-server.typicode.com/Misterprops/aluraGeek/productos/${id}`, {
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