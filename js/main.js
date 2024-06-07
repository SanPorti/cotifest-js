
const container = document.getElementById("container-productos");

const titulo = document.getElementById("nuestros-productos");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("../json/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(productos => {
            mostrarProductos(productos)
        })
    });

function mostrarProductos(productos) {

    const card = document.createElement("div");
    card.className = "card-productos";

    const nombre = document.createElement("h2");
    nombre.innerText = productos.nombre.toUpperCase();
    nombre.className = "nombre";

    const imagen = document.createElement("img");
    imagen.src = productos.imagen;
    imagen.className = "img-productos";

    const precio = document.createElement("p")
    precio.innerText = `$${productos.precio}`;
    precio.className = "precio";

    const boton = document.createElement("button");
    boton.innerText = "Agregar al Carrito";
    boton.className = "boton-productos";
    boton.onclick = () => agregarAlCarrito(productos);

    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(boton);

    container.appendChild(card);

};

function agregarAlCarrito(producto) {
    if (carrito.some(el => el.codigo === producto.codigo)) {
        let indiceProducto = carrito.findIndex(el => el.codigo === producto.codigo);
        carrito[indiceProducto].cantidad++;
    } else {
        carrito.push(producto);
    }

    let timerInterval;
    Swal.fire({
        title: "Producto Añadido a tu Carrito",
        icon: "success",
        timer: 1200,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
}









