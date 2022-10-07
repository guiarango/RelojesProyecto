let plpProductos = document.querySelector(".plp-productos");

const url = window.location.pathname;
let generoPagina;

switch (true) {
  case url.includes("categoriasHombre"):
    generoPagina = "Hombre";
    break;
  case url.includes("categoriasMujer"):
    generoPagina = "Mujer";
    break;
  case url.includes("categoriasNino"):
    generoPagina = "Nino";
    break;
  case url.includes("categoriasNina"):
    generoPagina = "Nina";
    break;
}

console.log(generoPagina);

class Producto {
  constructor(infoProducto) {
    this.id = infoProducto.id;
    this.titulo = infoProducto.titulo;
    this.precioViejo = infoProducto.precioViejo;
    this.precioNuevo = infoProducto.precioNuevo;
    this.img = infoProducto.img;
    this.genero = infoProducto.genero;
  }

  objetoARenderizar() {
    //Se crea contenedor
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("producto-item");

    //Se crea imagen
    const itemImageA = document.createElement("a");
    const itemImage = document.createElement("img");
    itemImage.classList.add("image-product");
    itemImage.setAttribute("src", this.img);
    itemImage.setAttribute("alt", this.titulo);
    itemImageA.appendChild(itemImage);

    //Se crea Nombre de producto
    const itemName = document.createElement("p");
    itemName.classList.add("nombreProducto");
    itemName.innerText = this.titulo;

    //Se crea Precio de producto
    const itemPrice = document.createElement("p");
    const spanPrecioViejo = document.createElement("span");
    const spanPrecioNuevo = document.createElement("span");
    itemName.classList.add("precioProducto");
    spanPrecioViejo.classList.add("precioViejo");
    spanPrecioViejo.innerText = this.precioViejo;
    spanPrecioNuevo.classList.add("precioNuevo");
    spanPrecioNuevo.innerText = this.precioNuevo;
    itemPrice.appendChild(spanPrecioViejo);
    itemPrice.appendChild(spanPrecioNuevo);

    //Se crea boton agregar al carrito
    const buttonAgregarCarrito = document.createElement("button");
    buttonAgregarCarrito.classList.add("agregarAlCarrito");
    buttonAgregarCarrito.setAttribute("data-id", this.id);
    buttonAgregarCarrito.innerText = "Agregar al carrito";

    itemDiv.appendChild(itemImageA);
    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(buttonAgregarCarrito);

    return itemDiv;
  }
}

class PlpProductos {
  constructor(claseDestino) {
    this.plpDestino = claseDestino;
    this.productosCarrusel = this.buscarProductos();
  }

  async buscarProductos() {
    let productosBuscados = await fetch("../database/productos.json");
    productosBuscados = await productosBuscados.json();

    productosBuscados = productosBuscados.filter(
      (element) => element.genero == generoPagina
    );

    return productosBuscados;
  }

  async renderizarProductosEnPlp() {
    let listaDeProductos = await this.productosCarrusel;
    let objetoPadre = document.querySelector(this.plpDestino);

    listaDeProductos.forEach((element) => {
      let newProducto = new Producto(element);
      objetoPadre.appendChild(newProducto.objetoARenderizar());
    });
  }
}

window.addEventListener("load", (event) => {
  const carrusel = new PlpProductos(".plp-productos");
  carrusel.renderizarProductosEnPlp();
});

plpProductos.addEventListener("click", function (event) {
  if (event.target.className == "agregarAlCarrito") {
    //Se extrae la información del producto
    let productId = event.target.dataset.id;
    let itemsCarrito = window.localStorage.getItem("itemsCarrito");

    //Se valida si hay info en el carrito
    if (itemsCarrito) {
      let itemsEnCarritoActual = JSON.parse(itemsCarrito);

      let productoEnCarrito = itemsEnCarritoActual.filter(
        (element) => element == productId
      );

      //Si no existe el producto en el carrito, se agrega, de otra manera no
      if (productoEnCarrito.length <= 0) {
        itemsEnCarritoActual.push(productId);
        window.localStorage.setItem(
          "itemsCarrito",
          JSON.stringify(itemsEnCarritoActual)
        );
      }
    } else {
      window.localStorage.setItem("itemsCarrito", JSON.stringify([productId]));
    }
  }
});
