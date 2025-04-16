class Tarea {
    static contadorTareas = 0;
    // Metodo Constructor
    constructor(titulo, descripcion, fecha, estado){
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._fecha = fecha;
        this._estado = estado;
        this._id = ++Tarea.contadorTareas;
    }
    // Metodos GET
    get titulo(){
        return this._titulo;
    }
    get descripcion(){
        return this._descripcion;
    }
    get fecha(){
        return this._fecha;
    }
    get estado(){
        return this._estado;
    }
    get id(){
        return this._id;
    }
    // Metodos SET
    set titulo(titulo){
        this._titulo = titulo;
    }
    set descripcion(descripcion){
        this._descripcion = descripcion;
    }
    set fecha(fecha){
        this._fecha = fecha;
    }
    set estado(estado){
        this._estado = estado;
    }
}