import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];

  isFetching:boolean = false;
  error = null;
  constructor(private postService:PostsService) {}

  ngOnInit() {

    this.onFetchPosts();
  }

  onCreatePost(postData:Post ) {
    // Send Http request

    this.postService.error.subscribe(
      errorMessage => {
        console.log("recieved error from a subject " + errorMessage);
      }
    );

    this.postService.createPost(postData.title,postData.content);
    

   
  }

 
  onFetchPosts(){

    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe(
      posts => {
        this.loadedPosts = posts;
        console.log("there are " + this.loadedPosts.length + "posts")
        this.isFetching = false;
        this.error = null;
      },
      error => {
        console.log(error);
        this.error = error.message;
        this.isFetching = false;
      }
    );
    ;
    
   
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(data =>{
      this.loadedPosts = [];
      this.isFetching = false;
    });
    ;
    
    //this.loadedPosts = [];

  }
}
