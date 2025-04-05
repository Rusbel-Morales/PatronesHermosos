export const obtenerFechaActual = () => {
    const fecha = new Date();
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };
  
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  };