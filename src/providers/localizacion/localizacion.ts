import { localizaciones } from './../../app/localizaciones';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { throwError } from 'rxjs/internal/observable/throwError';
// import { catchError } from 'rxjs/operators';
// import { map, switchMap } from 'rxjs/operators';

/*
  Generated class for the LocalizacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizacionProvider {
  urlv = 'http://31.220.55.5:3000:3000/api/vehiculos';
  urld = 'http://31.220.55.5:3000:3000/api/Datos';
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  constructor(public http: HttpClient) {
    console.log('Hello LocalizacionProvider Provider');
  }
  /*private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return ThrowError(
      'Something bad happened; please try again later.');
  };*/

  insertarloc(lol: localizaciones): Observable<localizaciones>{
    console.log(lol);
    return this.http.post<localizaciones>(this.urlv,lol, {headers: this.headers})
  }
  actualizarloc(lol: localizaciones){
    return new Promise(resolve=>{
  		this.http.put(this.urlv+'/'+1,lol).subscribe(data=>{
  			resolve(data);
  		}, err=>{
  			console.log(err);
  		})
  	});
  }
  obtenerdir(){
    return new Promise(resolve=>{
  		this.http.get(this.urld).subscribe(data=>{
  			resolve(data);
  		}, err=>{
  			console.log(err);
  		})
  	});

  }

  obtenerveh(){
    return this.http.get<localizaciones>(this.urlv);
  }
}
