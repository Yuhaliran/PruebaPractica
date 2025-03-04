import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendedorService } from '../../servicios/vendedor.service';
import { Vendedor } from '../../modelos/vendedor.model';

@Component({
  selector: 'app-buscar',
  standalone: true,
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class BuscarComponent {
  idVendedor: string = '';
  vendedor: Vendedor | null = null;
  mensaje: string = '';

  constructor(private vendedorService: VendedorService) {}

  buscarVendedor(): void {
    this.mensaje = '';
    this.vendedor = null;
    
    if (!this.idVendedor || this.idVendedor.trim() === '') {
      this.mensaje = 'Por favor, ingresa un ID valido.';
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

  mostrarNivelRiesgo(edad: number): void {
    let mensaje: string = '';
    if (edad >= 18 && edad <= 25) {
      mensaje = 'FUERA DE PELIGRO';
    } else if (edad >= 26 && edad <= 50) {
      mensaje = 'TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCION';
    } else if (edad >= 51) {
      mensaje = 'POR FAVOR QUEDESE EN CASA';
    } else {
      mensaje = 'Edad no valida';
    }
    window.alert(mensaje);
  }
}
