// Ventana Modal
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.querySelector(".btn_agregar");
const spanClose = document.querySelector(".cerrar");
const btnAgregarEnModal = document.getElementById("btn_agregar_modal");

// Array de objetos tipo Tarea
const array_tareas = new Array();

// Paginacion de Tareas
let paginaActual= 1;
const tareasPorPagina = 6;

actualizarBotones(array_tareas.length);

// Abrir Modal
btnAgregar.addEventListener("click", () => {
    modal.style.display = "block";
    modal.style.backgroundColor = "#F5F5F5";
    document.getElementById("modalOverlay").style.display = "flex";

    // Establecemos la fecha minima del input como hoy
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    const fechaMinima = `${anio}-${mes}-${dia}`;
    const fechaInput = document.getElementById("form_fecha_tarea");
    fechaInput.min = fechaMinima;
})

// Funcion para cerrar modal
const cerrarModal = () => {
    modal.style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";

    //Limpiamos el formulario
    document.getElementById("formulario_agregar_tarea").reset();
    errorTitulo.textContent = "";
    errorDescripcion.textContent = "";
    errorFecha.textContent = "";
}

// Cerramos si se clickea la "X" o si presionamos "Escape"
spanClose.addEventListener("click", cerrarModal);
document.addEventListener("keydown", (evento)=>{
    if(evento.key === "Escape"){
        cerrarModal();
    }
})

// Agregar Tarea a nuestro array de tareas
btnAgregarEnModal.addEventListener('click', (e)=>{
    e.preventDefault(); // <- Evita que se envíe el formulario y recargue la página

    let tareaValida = true;

    // inputs
    const tituloTarea = document.getElementById("form_titulo_tarea");
    const descripcionTarea = document.getElementById("form_descripcion_tarea");
    const fechaTarea = document.getElementById("form_fecha_tarea");
    // errores
    const errorTitulo = document.getElementById("errorTitulo");
    const errorDescripcion = document.getElementById("errorDescripcion");
    const errorFecha = document.getElementById("errorFecha");

    // Limpiamos posibles errores
    errorTitulo.textContent = "";
    errorDescripcion.textContent = "";
    errorFecha.textContent = "";

    let titulo = tituloTarea.value.trim();
    let descripcion = descripcionTarea.value.trim();
    let fecha = fechaTarea.value;
    let estadoTarea = "pendiente..";

    // Validaciones
    if (!titulo){
        errorTitulo.textContent = "Error, ingrese un título válido.";
        tareaValida = false;
    }
    if (!descripcion){
        errorDescripcion.textContent = "Error, ingrese una descripción válida.";
        tareaValida = false;
    }
    if (!fechaValida(fecha)){
        errorFecha.textContent = "Error, ingrese una fecha válida."
        tareaValida = false;
    }
    if(tareaValida){
        const nuevaTarea = new Tarea(titulo, descripcion, fecha, estadoTarea);

        array_tareas.push(nuevaTarea);

        console.log(array_tareas);

        paginaActual = Math.ceil(array_tareas.length / tareasPorPagina);

        cerrarModal();
        mostrarTareas(array_tareas);
    }
})

// Validamos que la fecha no este vacía
function fechaValida(fecha){

    if (!fecha) return false;

    const hoy = new Date();
    const fechaLimite = new Date(fecha);
    // Establecemos en 0 ambas horas para evitar errores en la comparación

    hoy.setHours(0, 0, 0, 0);
    fechaLimite.setHours(0, 0, 0, 0); 

    if (fechaLimite < hoy) return false;

    return true;
}

// Funcion para mostrar tareas en la interfaz
function mostrarTareas(array){
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    const inicio = (paginaActual - 1) * tareasPorPagina;
    const fin = inicio + tareasPorPagina;
    const tareasPagina = array.slice(inicio, fin);

    tareasPagina.forEach(t => {
        const tarea = document.createElement("div");
        tarea.classList.add("tarea");

        const[anio, mes, dia] = t.fecha.split("-");
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        tarea.innerHTML = `
        <div class="tarea_titulo">${t.titulo}</div>
        <div class="tarea_descripcion">${t.descripcion}</div>
        <div class="tarea_barra_inferior">
            <span class="tarea_fecha">${fechaFormateada}</span>
            <span class="tarea_estado">${t.estado}</span>
        </div>
        `
        listaTareas.appendChild(tarea);
    });

    actualizarBotones(array_tareas.length);
}

// Funciones y validaciones para la paginacion de tareas
function actualizarBotones(totalTareas) {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    const totalPaginas = Math.ceil(totalTareas / tareasPorPagina);

    if (array_tareas.length <= 6) {
        // Si solo hay una pagina, ocultar y desactivar ambos botones
        btnAnterior.disabled = true;
        btnSiguiente.disabled = true;
        btnAnterior.classList.add("oculto");
        btnSiguiente.classList.add("oculto");
    } else {
        btnAnterior.classList.remove("oculto");
        btnSiguiente.classList.remove("oculto");
        btnAnterior.disabled = paginaActual === 1;
        btnSiguiente.disabled = paginaActual === totalPaginas;
    }
}

document.getElementById("btnAnterior").addEventListener("click", ()=>{
    if (paginaActual > 1){
        paginaActual--;
        mostrarTareas(array_tareas);
    }
});

document.getElementById("btnSiguiente").addEventListener("click", ()=>{
    const totalPaginas = Math.ceil(array_tareas.length / tareasPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarTareas(array_tareas);
    }
});