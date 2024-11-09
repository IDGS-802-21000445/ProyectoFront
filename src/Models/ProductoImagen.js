class ProductoImagen {
  constructor(idImagen, idProducto, imagenUrl) {
    this.idImagen = idImagen ?? 0;
    this.idProducto = idProducto ?? 0;
    this.imagenUrl = imagenUrl ?? '';
  }
}

export default ProductoImagen;
