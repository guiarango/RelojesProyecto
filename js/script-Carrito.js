class Carrito {
  constructor() {
    this.itemsCarrito = this.getItemCarrito();
    this.carritoActivo = false;
  }

  crearEstructuraCarrito() {
    //Crear modal de carrito e insertar el carrito en el DOM
    const modalCarrito = document.createElement("div");
    modalCarrito.classList.add("modalCarrito");

    const modalCarritoCreado = document.body
      .querySelector("main")
      .insertAdjacentElement("afterbegin", modalCarrito);

    //Insertar boton de cerrar carrito
    const botonCerrar = document.createElement("div");
    botonCerrar.classList.add("botonCerrarCarrito");
    botonCerrar.insertAdjacentText("afterbegin", "X");
    const botonCerrarCreado = modalCarritoCreado.insertAdjacentElement(
      "beforeend",
      botonCerrar
    );
    botonCerrarCreado.addEventListener("click", (event) => {
      event.preventDefault();
      this.cambiarEstadoDeCarrito();
    });

    //Se listan los productos
    this.listarProductosEnCarrito(modalCarritoCreado);
  }

  listarProductosEnCarrito(modalCarritoCreado) {
    //Crear contenido del carrito
    let contenidoCarrito;

    function crearTablaDeItems(itemsCarrito) {
      const tbl = document.createElement("table");
      const tblHead = document.createElement("thead");
      const tblHeadRow = document.createElement("tr");
      const tblBody = document.createElement("tbody");

      //Se pegan los titulos
      let fotoTitulo = document.createElement("td");
      fotoTitulo.innerText = "Foto";
      let NombreTitulo = document.createElement("td");
      NombreTitulo.innerText = "Nombre";
      let precioTitulo = document.createElement("td");
      precioTitulo.innerText = "Precio unitario";
      let cantidadTitulo = document.createElement("td");
      cantidadTitulo.innerText = "Cantidad";
      let cancelarTitulo = document.createElement("td");
      cancelarTitulo.innerText = "Cancelar";

      tblHeadRow.appendChild(fotoTitulo);
      tblHeadRow.appendChild(NombreTitulo);
      tblHeadRow.appendChild(precioTitulo);
      tblHeadRow.appendChild(cantidadTitulo);
      tblHeadRow.appendChild(cancelarTitulo);

      tblHead.appendChild(tblHeadRow);

      //se pegan los datos
      itemsCarrito.forEach((element, index) => {
        const row = document.createElement("tr");

        let fotoProducto = document.createElement("td");
        let referenciaProducto = document.createElement("td");
        let precioProducto = document.createElement("td");
        let cantidadProducto = document.createElement("td");
        let cancelarProducto = document.createElement("td");
        let imagenProducto = document.createElement("img");

        //Se crea la celda con imagen
        imagenProducto.setAttribute("src", `${element.img}`);
        fotoProducto.appendChild(imagenProducto);

        //Se crea la celda con referencia
        referenciaProducto.classList.add("referenciaProducto");
        referenciaProducto.innerText = `${element.titulo}`;

        //Se crea la celda con referencia
        precioProducto.classList.add("precioProducto");
        precioProducto.innerText = `${element.precioNuevo}`;

        //Se crea el input con la cantidad
        let inputCantidad = document.createElement("input");
        inputCantidad.setAttribute("type", `number`);
        inputCantidad.setAttribute("value", `1`);
        inputCantidad.setAttribute("step", `1`);
        cantidadProducto.appendChild(inputCantidad);

        //Se crea la celda cancelar producto
        cancelarProducto.classList.add("cancelarProducto");
        cancelarProducto.setAttribute("data-id", `${element.id}`);
        cancelarProducto.innerText = `X`;

        row.appendChild(fotoProducto);
        row.appendChild(referenciaProducto);
        row.appendChild(precioProducto);
        row.appendChild(cantidadProducto);
        row.appendChild(cancelarProducto);

        tblBody.appendChild(row);
      });

      tbl.appendChild(tblHead);
      tbl.appendChild(tblBody);
      modalCarritoCreado.insertAdjacentElement("beforeend", tbl);
    }

    //Esta variable contendrá el valor de items carrito al final del borrado
    let itemsfinalesCarrito;

    if (this.itemsCarrito != null) {
      //Crear elementos de la tabla
      crearTablaDeItems(this.itemsCarrito);
      //Se crea el boton pagar todo
      let botonPagarCarrito = document.createElement("a");
      botonPagarCarrito.innerText = "Pagar Carrito";
      botonPagarCarrito.classList.add("botonPagarCarrito");
      modalCarritoCreado.insertAdjacentElement("beforeend", botonPagarCarrito);

      //Se agrega evento para quitar producto de carrito
      let tablaCarrito = document.querySelector("table");

      tablaCarrito.addEventListener("click", function (event) {
        if (event.target.className == "cancelarProducto") {
          const rowCarrito = event.target.closest("tr");
          const productoCarrito = parseInt(event.target.dataset.id);
          let itemsCarritoNuevo = window.localStorage.getItem("itemsCarrito");
          itemsCarritoNuevo = JSON.parse(itemsCarritoNuevo);

          itemsCarritoNuevo = itemsCarritoNuevo.filter(
            (element) => element != productoCarrito
          );

          itemsfinalesCarrito = itemsCarritoNuevo;
          //Validar que el array no esté vacío
          if (itemsCarritoNuevo.length <= 0) {
            window.localStorage.removeItem("itemsCarrito");
            const botonPagarCarritoQuitar =
              document.querySelector(".botonPagarCarrito");
            botonPagarCarritoQuitar.remove();

            contenidoCarrito = document.createElement("p");
            contenidoCarrito.classList.add("carritoVacio");
            contenidoCarrito.insertAdjacentText(
              "afterbegin",
              "No hay productos en su carrito"
            );
            modalCarritoCreado.insertAdjacentElement(
              "beforeend",
              contenidoCarrito
            );
            document.querySelector("table").remove();
          } else {
            window.localStorage.setItem(
              "itemsCarrito",
              JSON.stringify(itemsCarritoNuevo)
            );
          }

          rowCarrito.remove();
        }
      });
    } else {
      //Crear elementos de carrito vacio
      contenidoCarrito = document.createElement("p");
      contenidoCarrito.classList.add("carritoVacio");
      contenidoCarrito.insertAdjacentText(
        "afterbegin",
        "No hay productos en su carrito"
      );
      modalCarritoCreado.insertAdjacentElement("beforeend", contenidoCarrito);
    }

    this.itemsCarrito = itemsfinalesCarrito;
  }

  removerEstructuraCarrito() {
    const modalCarritoCreado = document.body.querySelector(".modalCarrito");
    modalCarritoCreado.remove();
  }

  cambiarEstadoDeCarrito() {
    this.carritoActivo = !this.carritoActivo;

    this.carritoActivo
      ? this.crearEstructuraCarrito()
      : this.removerEstructuraCarrito();
  }

  async getItemCarrito() {
    //Se trae la información del localStorage
    let itemsEnStorage = JSON.parse(
      window.localStorage.getItem("itemsCarrito")
    );

    //Se valida que no esté vacía
    if (itemsEnStorage == null) {
      this.itemsCarrito = null;
      return;
    }

    //Se trae la información del JSON
    let productosBuscados = await fetch("../database/productos.json");
    productosBuscados = await productosBuscados.json();

    //Se filtran los productos que se encuentran tanto en localStorage como en el JSON
    const productosFiltrados = productosBuscados.filter((element) =>
      itemsEnStorage.includes(element.id.toString())
    );

    //Se crea un mapa para poder manipular los objetos más fácilmente
    let mapItemsCarrito = new Map();
    productosFiltrados.forEach((element) =>
      mapItemsCarrito.set(element.id, element)
    );

    //Se setean los items del carrito al nuevo Mapa
    this.itemsCarrito = mapItemsCarrito;
  }
  mostrarElementosCarritos() {
    console.log(this.itemsCarrito);
  }
}

//Se crea la instancia de carrito
const carrito = new Carrito();

//Controlar el estado del carrito para que aparezca o desaparezca según corresponda
const iconoCarrito = document.querySelector(".carrito");

iconoCarrito.addEventListener("click", async (event) => {
  event.preventDefault();
  await carrito.getItemCarrito();
  carrito.cambiarEstadoDeCarrito();
});
