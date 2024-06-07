
const container = document.getElementById("container-carrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductosCarrito(carrito) {

    container.innerHTML = "";
    let totalCarrito = carrito.reduce((total, productoAgregado) => total + productoAgregado.precio * productoAgregado.cantidad, 0);

    carrito.forEach(el => {

        const card = document.createElement("div");
        card.className = "card-carrito";

        const nombre = document.createElement("h2");
        nombre.innerText = el.nombre.toUpperCase();
        nombre.className = "nombre-carrito";

        const imagen = document.createElement("img");
        imagen.src = el.imagen;
        imagen.className = "img-carrito";

        const precio = document.createElement("p")
        precio.innerText = `$${el.precio * el.cantidad}`;
        precio.className = "precio-carrito";

        const cantidad = document.createElement("p");
        cantidad.innerText = `Cantidad: ${el.cantidad}`;
        cantidad.className = "cantidad-carrito";

        const boton = document.createElement("button");
        boton.innerText = "Quitar del Carrito";
        boton.className = "boton-carrito";
        boton.onclick = () => quitarDelCarrito(el.codigo);

        const totalCompra = document.createElement("p");
        totalCompra.innerText = `$${totalCarrito}`;
        totalCompra.className = "total";

        const descripcion = document.createElement("div");
        descripcion.className = "descripcion-producto-carrito";

        const imagenDescripcion = document.createElement("div");
        imagenDescripcion.className = "img-descripcion";

        descripcion.appendChild(nombre);
        descripcion.appendChild(precio);
        descripcion.appendChild(cantidad);
        imagenDescripcion.appendChild(imagen);
        imagenDescripcion.appendChild(descripcion);
        card.appendChild(imagenDescripcion);
        card.appendChild(boton);

        container.appendChild(card);
    });

    const totalCompra = document.createElement("p");
    totalCompra.innerText = `$${totalCarrito}`;
    totalCompra.className = "total";
    const tituloTotalCompra = document.createElement("p");
    tituloTotalCompra.innerText = "total: ";
    tituloTotalCompra.className = "titulo-total";
    const contenendorTotal = document.createElement("div");
    contenendorTotal.className = "container-total"
    contenendorTotal.appendChild(tituloTotalCompra)
    contenendorTotal.appendChild(totalCompra);
    container.appendChild(contenendorTotal);

};

mostrarProductosCarrito(carrito);


function quitarDelCarrito(id) {
    Swal.fire({
        title: "¿Estas Seguro?",
        text: "¿Quieres Quitar Este Producto del Carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Quitarlo",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            container.innerHTML = "";
            let productoAgregado = carrito.find(el => el.codigo === id);
            if (productoAgregado) {
                if (productoAgregado.cantidad > 1) {
                    productoAgregado.cantidad--;
                } else {
                    carrito = carrito.filter(el => el.codigo !== id);
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                mostrarProductosCarrito(carrito);
            }
            Swal.fire({
                title: "Producto Quitado de tu Carrito",
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
        }
    });
}

