
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../modelos/vendedor.model';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private apiUrl: string = 'http://localhost:5050/vendedores';

  constructor(private http: HttpClient) {}

  obtenerVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.apiUrl);
  }

  obtenerVendedorPorId(id: string): Observable<Vendedor> {
    return this.http.get<Vendedor>(`${this.apiUrl}/${id}`);
  }

  actualizarVendedor(vendedor: Vendedor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${vendedor.idVendedor}`, vendedor);
  }

  crearVendedor(vendedor: Vendedor): Observable<any> {
    return this.http.post(this.apiUrl, vendedor);
  }


  eliminarVendedor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
