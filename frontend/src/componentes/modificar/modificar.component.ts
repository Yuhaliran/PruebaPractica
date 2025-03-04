import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../servicios/vendedor.service';
import { Vendedor } from '../../modelos/vendedor.model';

@Component({
  selector: 'app-modificar',
  standalone: true,
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ModificarComponent {
  idVendedor: string = '';
  vendedor: Vendedor | null = null;
  mensaje: string = '';

  constructor(private vendedorService: VendedorService) {}

  buscarVendedor(): void {
    this.mensaje = '';
    this.vendedor = null;

    if (!this.idVendedor || this.idVendedor.trim() === '') {
      this.mensaje = 'ngresa un id valido.';
      return;
    }

    this.vendedorService.obtenerVendedorPorId(this.idVendedor).subscribe({
      next: (data: Vendedor) => {
        this.vendedor = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensaje = 'Vendedor no encontrado';
        } else {
          this.mensaje = 'Error al buscar vendedor';
          console.error(err);
        }
      }
    });
  }

  actualizarVendedor(): void {
    if (this.vendedor) {
      this.vendedorService.actualizarVendedor(this.vendedor).subscribe({
        next: (response: any) => {
          this.mensaje = response.message;
        },
        error: (err) => {
          this.mensaje = 'Error al actualizar vendedor';
          console.error(err);
        }
      });
    }
  }
}
