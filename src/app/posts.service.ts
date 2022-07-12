import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createPost(title: string, content: string) {

    const postData: Post = { 'title': title, 'content': content };
    this.http.post<{ name: string }>
      ("https://ng-firebase-15d0c-default-rtdb.firebaseio.com/posts/posts.json", postData)
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => { this.error.next(error.message) }

      );

  }

  fetchPosts() {

    let params = new HttpParams();
    params = params.append("pretty", true);
    return this.http.get<{ [key: string]: Post }>
      ("https://ng-firebase-15d0c-default-rtdb.firebaseio.com/posts/posts.json",
        {
          headers: new HttpHeaders({

            // "custom-header": "hello"
          }),
          'params':  params


        }
      )
      .pipe(
        map((responseData) => {
            console.log( responseData);

          const postArrays: Post[] = [];


          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {

              postArrays.push({ ...responseData[key], id: key })
            }
          }
          return postArrays;

        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {


    return this.http.delete(
      "https://ng-firebase-15d0c-default-rtdb.firebaseio.com/posts/posts.json");



  }
}
