const mostrarReloj = () => {
    let fecha = new Date();
    let hora = formatoHora(fecha.getHours());
    let minutos = formatoHora(fecha.getMinutes());
    let segundos = formatoHora(fecha.getSeconds());

    if (segundos % 2 == 0){
        document.getElementById("hora").innerHTML = `${hora}:${minutos}`;
    }
    else {
        document.getElementById("hora").innerHTML = `${hora} ${minutos}`;
    }

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    let diaSemana = dias[fecha.getDay()];
    let dia = fecha.getDate();
    let mes = meses[fecha.getMonth()];

    let fechaTexto = `${diaSemana} ${dia} ${mes}`

    document.getElementById("fecha").innerHTML = fechaTexto;
}

const formatoHora = (hora) => {
    if(hora < 10){
        hora = '0' + hora;
    }
    return hora;
}

setInterval(mostrarReloj, 1000);