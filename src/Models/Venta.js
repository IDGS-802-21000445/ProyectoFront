class Venta {
  constructor(idVenta, fechaVenta, total, idCliente) {
    this.idVenta = idVenta ?? 0;
    this.fechaVenta = fechaVenta ?? new Date();
    this.total = total ?? 0.0;
    this.idCliente = idCliente ?? 0;
  }
}

export default Venta;
