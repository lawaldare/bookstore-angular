import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl: string = 'https://www.googleapis.com/books/v1/volumes?';

  constructor(private http: HttpClient) { }



  searchBooks(book: any): Observable<any>{
    return this.http.get(`${this.baseUrl}q=${book}`) as Observable<any>;
  }

}
