class Productos {
    constructor (id, imagen, tipoDeProducto, sabor, descripcion, precio, cantidad) {
        this.id = id;
        this.imagen = imagen;
        this.tipoDeProducto = tipoDeProducto;
        this.sabor = sabor;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const productos = [];
let carrito = [];

productos.push (new Productos (1, "../imagenes/cuplimon.jpg", "Cupcakes", "Limon", "Cupcake con base de limón combinado con buttercream de vainilla. Opcionalmente se puede combinar con relleno de arandanos o buttercream de limón.", 50, 1));
productos.push (new Productos (2, "../imagenes/cupchoco.jpg", "Cupcakes", "Chocolate", "Delicioso cupcake de intenso chocolate, decorado con buttercream a base de chocolate.", 50, 1));
productos.push (new Productos (3, "../imagenes/cupvainilla.jpg", "Cupcakes", "Vainilla", "Nuestro clásico cupcake de vainilla, con una sencilla pero deliciosa buttercream de vainilla.", 40, 1));
productos.push (new Productos (4, "../imagenes/redvelvet.jpg", "Cupcakes", "Red Velvet", "Exquisito cupcake de red velvet decorado con buttercream a base de queso crema.", 60, 1));
productos.push (new Productos (5, "../imagenes/brownie.jpg", "Tortas", "Brownie", "Humedo y delicioso brownie con nueces como base, una generosa capa de dulce de leche repostero y merengue italiano para culminar.", 1800, 1));
productos.push (new Productos (6, "../imagenes/chocotorta.jpg", "Tortas", "Chocotorta", "Unica e irremplazable chocotorta, con las galletitas que amamos y la deliciosa crema chocotorta.", 1800, 1));
productos.push (new Productos (7, "../imagenes/cheesecakefrutos.jpg", "Tortas", "Cheesecake de Frutos Rojos", "Clásico cheesecake, con base de galletitas y deliciosamente combinado con frutos rojos de estación.", 2300, 1));
productos.push (new Productos (8, "../imagenes/cheesecakechoco.jpg", "Tortas", "Cheesecake de Chocolate", "Base de galletitas de chocolate, sobre la cual armamos una deliciosa y fresca cheesecake con chocolate amargo.", 2300, 1));
productos.push (new Productos (9, "../imagenes/lemonpie.jpg", "Tortas", "Lemon Pie", "Fresco y clásico, base de delicada masa sablé, relleno cremoso de limón y merengue italiano para completar.", 2500, 1));
productos.push (new Productos (10, "../imagenes/moussefrutilla.jpg", "Tortas", "Mousse de Frutilla", "Fresca y riquisima mousse de frutilla, sobre base de galletitas de chocolate.", 2500, 1));
productos.push (new Productos (11, "../imagenes/rogel.jpg", "Tortas", "Rogel", "El clásico rogel, capas y capas de crocante hojaldre, unidas por el más rico dulce de leche repostero, terminación con merengue italiano.", 2100, 1));
productos.push (new Productos (12, "../imagenes/manzana.jpg", "Tortas", "Crumble de Manzana", "Base de masa sablé, relleno suave y delicioso de manzana, con leve perfume de especias, coronado con el más crocante crumble.", 2100, 1));

console.log (productos);

const contenedor = document.querySelector ("#contenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector ("#precioTotal");



document.addEventListener ("DOMContentLoaded", ()=> {
    carrito = JSON.parse (localStorage.getItem("carrito")) || [];
    mostrarCarrito ();
})

productos.forEach((prod) => {
    const {id, imagen, tipoDeProducto, sabor, descripcion, precio} = prod;
    contenedor.innerHTML += `
		<div class="card h-100">
        <div class="card h-100">
        <img src="${imagen}" class="card-img-top"
            alt="cupcake de chocolate con buttercream de chocolate">
            <div class="card-body">
                <h5 class="card-title">${tipoDeProducto} de ${sabor}</h5>
                <p class="card-text text-wrap text-center"> ${descripcion
                } Precio por unidad $ <b> ${precio}</b></p>
                <a onclick="agregarProducto(${id})" class="btn btn-primary">Comprar</a>
            </div>
        </div>
    </div>
    `
})


vaciarCarrito.addEventListener ("click", () => {
    carrito.length = [];
    mostrarCarrito ();
})

const agregarProducto = (id) => {
    const existe = carrito.some (prod => prod.id === id)

    if (existe) {
        const prod = carrito.map (prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {
        const item = productos.find((prod) => prod.id === id);
        carrito.push(item);
        console.log (carrito);
    }
    
    mostrarCarrito ();
}


const mostrarCarrito = () => {
    const modalBody = document.querySelector (".modal .modal-body");
    console.log (modalBody)

    if (modalBody) {
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const {id, tipoDeProducto, sabor, precio, cantidad} = prod;
            modalBody.innerHTML += `
                <div class="modal-contenedor">
                    <div> 
                        <p>Tipo de Producto: ${tipoDeProducto}</p>
                        <p>Sabor: ${sabor}</p>
                        <p>Cantidad: ${cantidad}</p>
                        <p>Precio por unidad: $ ${precio}</p>
                    </div>
                </div>
            `;
        });
    }

    if (carrito.length === 0) {
        modalBody.innerHTML = `
        <p class="parrafo">Aun no agregaste nada al carrito</p>
        `;
      } else {
        console.log("Algo");
      }
    
      if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
          (acc, prod) => acc + prod.cantidad * prod.precio,
          0
        );
      }

    guardarStorage ();

}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}






