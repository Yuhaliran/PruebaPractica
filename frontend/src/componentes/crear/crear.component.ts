import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../servicios/vendedor.service';
import { Vendedor } from '../../modelos/vendedor.model';

@Component({
  selector: 'app-crear',
  standalone: true,
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CrearComponent {
  vendedor: Vendedor = {
    idVendedor: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    edad: 0,
    profesion: '',
    estadocivil: ''
  };

  mensaje: string = '';

  constructor(private vendedorService: VendedorService) {}

  crear(): void {
    this.vendedorService.crearVendedor(this.vendedor).subscribe({
      next: (response: any) => {
        this.mensaje = 'Se ha creado el vendedor';
        
        this.vendedor = {
          idVendedor: 0,
          nombre: '',
          apellido: '',
          direccion: '',
          edad: 0,
          profesion: '',
          estadocivil: ''
        };
      },
      error: (error) => {
        this.mensaje = 'No se pudo crear';
        console.error('Erorr al crear el vendedor:', error);
      }
    });
  }
}
