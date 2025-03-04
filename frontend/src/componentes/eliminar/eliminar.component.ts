import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../servicios/vendedor.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class EliminarComponent {
  idVendedor: string = '';
  mensaje: string = '';

  constructor(private vendedorService: VendedorService) {}

  eliminarVendedor(): void {
    if (!this.idVendedor || this.idVendedor.trim() === '') {
      this.mensaje = 'Ingresa un ID valido.';
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas eliminar este vendedor?')) {
      return;
    }

    this.vendedorService.eliminarVendedor(this.idVendedor).subscribe({
      next: (response: any) => {
        this.mensaje = response.message;
        this.idVendedor = ''; 
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensaje = 'Vendedor no encontrado';
        } else {
          this.mensaje = 'No se pudo eliminar el vendedor';
          console.error(err);
        }
      }
    });
  }
}
