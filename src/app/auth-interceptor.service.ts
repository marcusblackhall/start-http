import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



export class AuthInterceptorService implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log("req is on its way");
       const modifiedReq = req.clone({ headers: req.headers.append("MY-TAG","Hi mArcus")});

             req.headers.append("M-tag","Hi Guys");
            return next.handle(modifiedReq);


    }



}