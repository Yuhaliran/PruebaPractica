import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedorService } from '../../servicios/vendedor.service';
import { Vendedor } from '../../modelos/vendedor.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ver-todos',
  standalone: true,
  templateUrl: './ver-todos.component.html',
  styleUrls: ['./ver-todos.component.scss'],
  imports: [CommonModule, MatTableModule]
})
export class VerTodosComponent implements OnInit {
  vendedores: Vendedor[] = [];

  constructor(private vendedorService: VendedorService) {}

  ngOnInit(): void {
    this.vendedorService.obtenerVendedores().subscribe({
      next: (data: Vendedor[]) => {
        this.vendedores = data;
      },
      error: (err) => {
        console.error('Error al obtener vendedores:', err);
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
