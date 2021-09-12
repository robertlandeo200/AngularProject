import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RickmortyService } from 'src/app/service/rickmorty.service';
import { Personaje } from '../models/Personaje';
import { Ubicacion } from '../models/Ubicacion';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cboNombre = "name"; 
  public vFiltroPersonaje = false; 
  public vFiltroUbicacion = false;
  public vFiltroEpisodio = false;
  public dataPersonaje$: any[] = [];
  public cboUbicacion= "name"; 
  public dataUbicacion$: any[] = [ ];
  public cboEpisodio = "name"; 
  public dataEpisodio$: any[] = [ ];
  public nombrePersonaje = "";
  public nombreUbicacion = "";
  public codigoEpisodio = "";
  public nombreEpisodio = "";
  public ltComparacion: any[] = [];
  idPersonajes = "";
  idUbicaciones = "";
  idEpisodios = "";
  dropdownSettings: IDropdownSettings = {};
  selectedItems:any[] = [];
  selectedItemsUbicacion:any[] = [];
  selectedItemsEpisodio:any[] = [];
  listBusqueda: any[] = [ ];
  listFinal: any[] = [ ];
  listBusquedaUbicacion: any[] = [ ];
  listFinalUbicacion: any[] = [ ];
  listBusquedaEpisodio: any[] = [ ];
  listFinalEpisodio: any[] = [ ];
  listPersonajesEpisodios: any[] = [];
  listPersonajesEpisodiosFinal: any[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _rickmortyService: RickmortyService) {
    this.form=this.fb.group({
      txtPersonaje: [""],
      txtUbicacion: ["", Validators.minLength(8)],
      txtEpisodio: [""],
    })
   }

  ngOnInit(): void {
    this.obtenerPersonajes();
    this.obtenerUbicaciones();
    this.obtenerEpisodios();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 5,
      limitSelection: 10,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  obtenerPersonajes(){
    this._rickmortyService.getListPersonajesGeneral().subscribe(data => {
      console.log(data);
      this.dataPersonaje$ = data.results;
      console.log(this.dataPersonaje$);
      //this.listUsuario = data.ltUsuario;
    }, error => {
      console.log(error);
    });
  }
  obtenerUbicaciones(){
    this._rickmortyService.getListUbicacionGeneral().subscribe(data => {
      console.log(data);
      this.dataUbicacion$ = data.results;
      //this.listUsuario = data.ltUsuario;
    }, error => {
      console.log(error);
    });
  }
  obtenerEpisodios(){
    this._rickmortyService.getListEpisodioGeneral().subscribe(data => {
      console.log(data);
      this.dataEpisodio$ = data.results;
      //this.listUsuario = data.ltUsuario;
    }, error => {
      console.log(error);
    });
  }
  validarFiltro(){
    if((this.nombreUbicacion != "" || this.codigoEpisodio != "") && this.idPersonajes == ""){
      this.vFiltroPersonaje = true;
    }else{
      this.vFiltroPersonaje = false;
    }
    if((this.nombreUbicacion != "" || this.idPersonajes != "") && this.codigoEpisodio == ""){
      this.vFiltroEpisodio = true;
    }else{
      this.vFiltroEpisodio = false;
    }
    if((this.idPersonajes != "" || this.codigoEpisodio != "") && this.nombreUbicacion == ""){
      this.vFiltroUbicacion = true;
    }else{
      this.vFiltroUbicacion = false;
    }
  }
  selectPersonaje(item:any) {
    this.nombrePersonaje = item.name;
    this.idPersonajes = "";
    this.selectedItems.forEach(element => {
      this.idPersonajes = this.idPersonajes + element.id + ","
    })
    if(this.idPersonajes.length > 1){
      this.idPersonajes = this.idPersonajes.substring(0, this.idPersonajes.length - 1);
    }
    this.validarFiltro();
  }
  onItemDeSelect(item:any) {
    this.idPersonajes = this.idPersonajes.replace(","+item.id, '');
    if(this.selectedItems.length == 0){
      this.idPersonajes = "";
      this.LimpiarPersonaje();
    }
    this.validarFiltro();
  }
  selectUbicacion(item:any) {
    this.nombreUbicacion = item.name;
    this.idUbicaciones = "";
    this.selectedItemsUbicacion.forEach(element => {
      this.idUbicaciones = this.idUbicaciones + element.id + ","
    })
    if(this.idUbicaciones.length > 1){
      this.idUbicaciones = this.idUbicaciones.substring(0, this.idUbicaciones.length - 1);
    }
    this.validarFiltro();
  }
  onItemDeSelectUbicacion(item:any) {
    this.idUbicaciones = this.idUbicaciones.replace(","+item.id, '');
    if(this.selectedItemsUbicacion.length == 0){
      this.idUbicaciones = "";
      this.LimpiarUbicacion();
    }
    this.validarFiltro();
  }
  selectEpisodio(item:any) {
    console.log(item);
    this.codigoEpisodio = item.episode;
    this.idEpisodios = "";
    this.selectedItemsEpisodio.forEach(element => {
      this.idEpisodios = this.idEpisodios + element.id + ","
    })
    if(this.idEpisodios.length > 1){
      this.idEpisodios = this.idEpisodios.substring(0, this.idEpisodios.length - 1);
    }
    this.validarFiltro();
    console.log(this.codigoEpisodio);
  }
  onItemDeSelectEpisodio(item:any) {
    this.idEpisodios = this.idEpisodios.replace(","+item.id, '');
    if(this.selectedItemsEpisodio.length == 0){
      this.idEpisodios = "";
      this.LimpiarEpisodio();
    }
    this.validarFiltro();

  }
  LimpiarPersonaje(){
    this.nombrePersonaje = "";
    this.listBusqueda = [];
    this.listFinal = [];
    this.validarFiltro();
  }
  LimpiarUbicacion(){
    this.listBusquedaUbicacion = [];
    this.listFinalUbicacion = [];
    this.nombreUbicacion = "";
    this.validarFiltro();
  }
  LimpiarEpisodio(){
    this.listBusquedaEpisodio = [];
    this.codigoEpisodio = "";
    this.validarFiltro();
  }
  BusquedaPersonajes(){
    if(this.idPersonajes != ""){
      this.BusquedaPersonajesxNombre()
    }
    if(this.nombreUbicacion != ""){
      this.BusquedaUbicaciones()
    }
    if(this.codigoEpisodio != ""){
      this.BusquedaEpisodios()
    }
  }
  seleccionarPersonaje(personaje:any=[]){
    console.log(personaje)
    var vSeleccion = 0;
      this.ltComparacion.forEach(function(personajeSelect, index, object) {
        console.log(personajeSelect);
        console.log("aaaa");
        console.log(personajeSelect.nombre);
        if(personajeSelect.nombre == personaje.nombre){
          vSeleccion = 1;
          object.splice(index, 1);
        }
      });
      if(vSeleccion == 0){
        if(this.ltComparacion.length == 3){
          this.toastr.error('Solo se puede comprar 3 personajes', 'Aviso:');
        }else{
          var personajeSeleccion = new Personaje()
  
          personajeSeleccion.nombre = personaje.nombre
          personajeSeleccion.genero = personaje.genero
          personajeSeleccion.ubicacion = personaje.ubicacion
          personajeSeleccion.especie = personaje.especie
          personajeSeleccion.estado = personaje.estado
          //personajeSeleccion.episodio = personaje.name
            
          this.ltComparacion.push(personajeSeleccion)
          this.toastr.success('Personaje seleccionado', 'Aviso:');
        }
      }else{
        this.toastr.success('El personaje se quito de la lista a comparar', 'Aviso:');
      }
      
      console.log(this.ltComparacion);
    
  }
  BusquedaPersonajesxNombre(){
    this.listBusqueda = [];
    this.listFinal = [];
    if(this.idPersonajes.length > 1){
      this._rickmortyService.BuscarPersonajeMultiple(this.idPersonajes).subscribe(data => {
        this.listBusqueda = data;
        this.listBusqueda.forEach(element => {
  
          var episodioTrandom = element.episode[Math.floor(Math.random() * element.episode.length)]
  
          this._rickmortyService.BuscarEpisodioPersonaje(episodioTrandom).subscribe(data =>{
           
            console.log(episodioTrandom);
            console.log(data)
  
            var personaje = new Personaje()
  
            personaje.foto = element.image
            personaje.nombre = element.name
            personaje.genero = element.gender
            personaje.ubicacion = element.location.name
            personaje.especie = element.species
            personaje.estado = element.status
            personaje.episodio = data.name
      
            this.listFinal.push(personaje)
  
          })
  
        });
  
  
        //this.toastr.success('El Usuario fue eliminado con Exito!', 'SYCorp:');
      }, error =>{
        console.log(error);
      })
    } else{
      this._rickmortyService.BuscarPersonajexNombre(this.nombrePersonaje).subscribe(data => {
        this.listBusqueda = data.results;
        this.listBusqueda.forEach(element => {
  
          var episodioTrandom = element.episode[Math.floor(Math.random() * element.episode.length)]
  
          this._rickmortyService.BuscarEpisodioPersonaje(episodioTrandom).subscribe(data =>{
           
            console.log(episodioTrandom);
            console.log(data)
  
            var personaje = new Personaje()
  
            personaje.foto = element.image
            personaje.nombre = element.name
            personaje.genero = element.gender
            personaje.ubicacion = element.location.name
            personaje.episodio = data.name
      
            this.listFinal.push(personaje)
  
          })
  
        });
  
  
        //this.toastr.success('El Usuario fue eliminado con Exito!', 'SYCorp:');
      }, error =>{
        console.log(error);
      })
    }
    
    //this.toastr.success('El Usuario ' + nombreLogin + ' fue eliminado con Exito!', 'SYCorp:');*/
  }
  BusquedaUbicaciones(){
    if(this.idUbicaciones.length > 1){
      this._rickmortyService.BuscarUbicacionMultiple(this.idUbicaciones).subscribe(data => {
        this.listBusquedaUbicacion = data;
        
        this.listBusquedaUbicacion.forEach(element => {
  
          var cantidadResidentes = element.residents.length;
          var ubicacion = new Ubicacion()
  
          ubicacion.nombre = element.name
          ubicacion.tipo = element.type
          ubicacion.dimension = element.dimension
          ubicacion.cantidad_residentes = cantidadResidentes
          ubicacion.fecha_creacion = element.created
      
            this.listFinalUbicacion.push(ubicacion)
        });
      }, error =>{
        console.log(error);
      })
    }else{
      this._rickmortyService.BuscarPersonajexUbicacion(this.nombreUbicacion).subscribe(data => {
        this.listBusquedaUbicacion = data.results;
        
        this.listBusquedaUbicacion.forEach(element => {
  
          var cantidadResidentes = element.residents.length;
          var ubicacion = new Ubicacion()
  
          ubicacion.nombre = element.name
          ubicacion.tipo = element.type
          ubicacion.dimension = element.dimension
          ubicacion.cantidad_residentes = cantidadResidentes
          ubicacion.fecha_creacion = element.created
      
            this.listFinalUbicacion.push(ubicacion)
        });
      }, error =>{
        console.log(error);
      })
    }
    //this.toastr.success('El Usuario ' + nombreLogin + ' fue eliminado con Exito!', 'SYCorp:');*/
  }
  BusquedaEpisodios(){
    console.log(this.codigoEpisodio);
    if(this.idEpisodios.length > 1){
      this._rickmortyService.BuscarEpisodiosMultiple(this.idEpisodios).subscribe(data => {
        console.log(data);
        this.listBusquedaEpisodio = data;
      }, error =>{
        console.log(error);
      })
    }else{
      this._rickmortyService.BuscarPersonajexEpisodio(this.codigoEpisodio).subscribe(data => {
        console.log(data);
        this.listBusquedaEpisodio = data.results;
      }, error =>{
        console.log(error);
      })
    }
  }
  cargarDetalle(nombre:string, characters:any[]){
    this.listPersonajesEpisodiosFinal = [];
    this.nombreEpisodio = nombre;
    var ltPersonaje: any[] = [];
    ltPersonaje = characters;
    
    ltPersonaje.forEach(element => {
      this._rickmortyService.BuscarPersonajeEpisodioDetalle(element).subscribe(data =>{

        var personaje = new Personaje();

        personaje.foto = data.image
        personaje.nombre = data.name
        
        this.listPersonajesEpisodiosFinal.push(personaje)
      })

    });
    //this.toastr.success('El Usuario ' + nombreLogin + ' fue eliminado con Exito!', 'SYCorp:');*/
  }
 
}
