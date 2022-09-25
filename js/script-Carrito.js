let iconoCarrito = document.querySelector(".carrito");
// window.localStorage.setItem("itemsCarrito",'[["Prueba1", "http://127.0.0.1:5500/assets/productos/producto1.jpg"],["Prueba2", "http://127.0.0.1:5500/assets/productos/producto2.jpg"],["Prueba3", "http://127.0.0.1:5500/assets/productos/producto3.jpg"]]')
iconoCarrito.addEventListener("click", function (event) {
  let itemsCarrito = window.localStorage.getItem("itemsCarrito");
  let nombreModal = "modalCarrito";
  event.preventDefault();

  let carritoActivo = document.querySelector(".modalCarrito");

  //Validar que nop haya un carrito creado ya
  if (carritoActivo) {
    return;
  }

  //Crear modal de carrito
  let modalCarrito = document.createElement("div");
  modalCarrito.classList.add(nombreModal);

  //Insertar el elemento en el DOM
  document.body
    .querySelector("main")
    .insertAdjacentElement("afterbegin", modalCarrito);

  let modalCarritoCreado = document.querySelector(".modalCarrito");

  //Insertar boton de cerrar carrito
  let botonCerrar = document.createElement("div");
  botonCerrar.classList.add("botonCerrarCarrito");
  botonCerrar.insertAdjacentText("afterbegin", "X");
  modalCarritoCreado.insertAdjacentElement("beforeend", botonCerrar);

  const botonCerrarCarrito = document.querySelector(".botonCerrarCarrito");
  botonCerrarCarrito.addEventListener("click", function (event) {
    const carrito = document.querySelector(".modalCarrito");
    carrito.remove();
  });

  //Crear contenido del carrito
  let contenidoCarrito;
  if (itemsCarrito != null) {
    itemsCarrito = JSON.parse(itemsCarrito);

    //Crear elementos de la tabla
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    itemsCarrito.map((element, index) => {
      const row = document.createElement("tr");

      let fotoProducto = document.createElement("td");
      let referenciaProducto = document.createElement("td");
      let cantidadProducto = document.createElement("td");
      let cancelarProducto = document.createElement("td");
      let imagenProducto = document.createElement("img");
      //Se crea la celda con imagen
      imagenProducto.setAttribute("src", `${element[1]}`);
      fotoProducto.appendChild(imagenProducto);
      //Se crea la celda con referencia
      referenciaProducto.classList.add("referenciaProducto");
      referenciaProducto.innerText = `${element[0]}`;
      //Se crea el input con la cantidad
      let inputCantidad = document.createElement("input");
      inputCantidad.setAttribute("type", `number`);
      inputCantidad.setAttribute("value", `1`);
      inputCantidad.setAttribute("step", `1`);
      cantidadProducto.appendChild(inputCantidad);

      //Se crea la celda cancelar producto
      cancelarProducto.classList.add("cancelarProducto");
      cancelarProducto.innerText = `X`;

      row.appendChild(fotoProducto);
      row.appendChild(referenciaProducto);
      row.appendChild(cantidadProducto);
      row.appendChild(cancelarProducto);

      tblBody.appendChild(row);
    });

    tbl.appendChild(tblBody);
    modalCarritoCreado.insertAdjacentElement("beforeend", tbl);

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
        const productoCarrito = rowCarrito.querySelector(
          ".referenciaProducto"
        ).innerText;
        let itemsCarritoNuevo = window.localStorage.getItem("itemsCarrito");
        itemsCarritoNuevo = JSON.parse(itemsCarritoNuevo);

        itemsCarritoNuevo = itemsCarritoNuevo.filter(
          (element) => element[0] != productoCarrito
        );

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
});
