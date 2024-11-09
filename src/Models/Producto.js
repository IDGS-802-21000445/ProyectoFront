class Producto {
  constructor(productoId, titulo, desProducto, precio, descuento, existencias, marca, categoria, fondo) {
    this.productoId = productoId ?? 0;
    this.titulo = titulo ?? '';
    this.desProducto = desProducto ?? '';
    this.precio = precio ?? 0.0;
    this.descuento = descuento ?? 0.0;
    this.existencias = existencias ?? 0;
    this.marca = marca ?? '';
    this.categoria = categoria ?? '';
    this.fondo = fondo ?? '';
  }
}

export default Producto;
