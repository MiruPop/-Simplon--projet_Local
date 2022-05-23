import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> { 

    // Ajouter un token d'accès uniquement pour les endpoints sécurisés
    const securedEndpoints = [environment.LOCAL_API_URL + '/commandes',
                              environment.LOCAL_API_URL + '/checkout'
                            ];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {

      // récupérer le token d'accès
      const accessToken = await this.oktaAuth.getAccessToken();

      // cloner la requête pour pouvoir lui ajouter un header avec le token d'accès
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });

    }

    return next.handle(request).toPromise();
  }
}