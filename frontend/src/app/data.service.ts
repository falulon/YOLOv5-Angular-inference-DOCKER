import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://localhost:5000/analyze'


sendForm(image: File ):Observable<any>  {
  const endpoint = `${this.url}`;
  const formData: FormData = new FormData();
  // image is optional 
  if (image) {
    formData.append('image', image, "image");}
    
  // create a new form and send it all together
  
  
    return this.http
    .post<FormData>(endpoint,formData)
      .pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
