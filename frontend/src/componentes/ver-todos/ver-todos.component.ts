import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorService } from '../../servicios/vendedor.service';
import { Vendedor } from '../../modelos/vendedor.model';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-ver-todos',
  standalone: true,
  templateUrl: './ver-todos.component.html',
  styleUrls: ['./ver-todos.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class VerTodosComponent implements OnInit {
  vendedores: Vendedor[] = [];
  displayedColumns: string[] = [
    'idVendedor',
    'nombre',
    'apellido',
    'edad',
    'direccion',
    'profesion',
    'estadocivil',
    'acciones'
  ];

  newVendedor: Vendedor = {
    idVendedor: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    edad: 0,
    profesion: '',
    estadocivil: ''
  };

  editingVendorId: number | null = null;
  mensaje: string = '';

  constructor(private vendedorService: VendedorService) {}

  ngOnInit(): void {
    this.cargarVendedores();
  }

  cargarVendedores(): void {
    this.vendedorService.obtenerVendedores().subscribe({
      next: (data: Vendedor[]) => {
        this.vendedores = data;
      },
      error: (err) => console.error(err)
    });
  }



  crear(): void {
    if (!this.newVendedor.nombre || !this.newVendedor.apellido || this.newVendedor.edad <= 0) {
      this.mensaje = 'Nombre, apellido y edad son obligatorios. Edad debe ser mayor a 0.';
      return;
    }
    this.vendedorService.crearVendedor(this.newVendedor).subscribe({
      next: (response: any) => {
        this.mensaje = 'Se creo el vendedor';
        this.cargarVendedores();
      },
      error: (err) => {
        this.mensaje = 'No se pudo crear el vendedor';
        console.error(err);
      }
    });
  }
  

  editar(v: Vendedor): void {
    this.editingVendorId = v.idVendedor;
  }

  guardar(v: Vendedor): void {
    if (!v.nombre || !v.apellido || v.edad <= 0) {
      this.mensaje =
        'Nombre, apellido y edad son obligatorios. Edad debe ser mayor a 0.';
      return;
    }
    this.vendedorService.actualizarVendedor(v).subscribe({
      next: (response: any) => {
        this.mensaje = response.message || 'Vendedor actualizado';
        this.editingVendorId = null;
        this.cargarVendedores();
      },
      error: (err) => {
        this.mensaje = 'Error al actualizar el vendedor';
        console.error(err);
      }
    });
  }

  cancelarEdicion(): void {
    this.editingVendorId = null;
    this.cargarVendedores();
  }

  eliminar(v: Vendedor): void {
    if (!window.confirm('Estas seguro de eliminar este vendedor?')) {
      return;
    }
    this.vendedorService.eliminarVendedor(v.idVendedor.toString()).subscribe({
      next: (response: any) => {
        this.mensaje = response.message || 'Vendedor eliminado';
        this.vendedores = this.vendedores.filter(x => x.idVendedor !== v.idVendedor);
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensaje = 'Vendedor no encontrado';
        } else {
          this.mensaje = 'No se pudo eliminar el vendedor';
        }
        console.error(err);
      }
    });
  }

  mostrarNivelRiesgo(edad: number): void {
    let msg: string;
    if (edad >= 18 && edad <= 25) {
      msg = 'FUERA DE PELIGRO';
    } else if (edad >= 26 && edad <= 50) {
      msg = 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCION';
    } else if (edad >= 51) {
      msg = 'POR FAVOR QUEDESE EN CASA';
    } else {
      msg = 'Edad no valida';
    }
    window.alert(msg);
  }
}
