let carousel = document.querySelector(".carousel");

carousel.addEventListener("click", function (event) {
  if (event.target.className == "agregarAlCarrito") {
    //Se extrae la información del producto
    let producto = event.target;
    let referencia = producto.dataset.referencia;
    let imagenProducto = producto
      .closest(".producto-item")
      .querySelector(".image-product");
    let rutaImagen = imagenProducto.currentSrc;
    let itemsCarrito = window.localStorage.getItem("itemsCarrito");

    //Se valida si hay info en el carrito
    if (itemsCarrito) {
      let itemsEnCarritoActual = JSON.parse(itemsCarrito);

      let productoEnCarrito = itemsEnCarritoActual.filter(
        (element) => element[0] == referencia && element[1] == rutaImagen
      );

      if (productoEnCarrito.length <= 0) {
        itemsEnCarritoActual.push([referencia, rutaImagen]);
        window.localStorage.setItem(
          "itemsCarrito",
          JSON.stringify(itemsEnCarritoActual)
        );
      }
    } else {
      window.localStorage.setItem(
        "itemsCarrito",
        JSON.stringify([[referencia, rutaImagen]])
      );
    }
  }
});
