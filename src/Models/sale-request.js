class Producto {
  constructor(titulo, precio) {
    this.titulo = titulo;
    this.precio = precio;
  }
}

class Sale {
  constructor(ventaId, productoId, cantidad, fechaVenta, producto) {
    this.ventaId = ventaId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.fechaVenta = new Date(fechaVenta);
    this.producto = new Producto(producto.titulo, producto.precio);
  }
}

export default Sale;
