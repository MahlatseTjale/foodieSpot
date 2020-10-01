

// import { PostCategory } from './../post.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostModel, PostCategory } from '../post.model'
import { PostsService } from './../posts.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  id: number;

  addNew: boolean = true;

  post: PostModel = new PostModel();

  subPostId: Subscription;
  
  constructor(private service: PostsService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
       // subscribe to changes in the parameter
       this.subPostId = this.route.paramMap.subscribe((map) => {
        if (map.get('id')) {
          // read parameter from url
          this.id = +map.get('id');
          console.log(`id:${this.id}`)
          // get the post for the corresponding post id
          this.service.getPost(this.id).subscribe(
            (post) => {
              this.post = post;
              this.addNew = false;
            },
            (error) => {
              console.log("Error")
            }
          );
          
        }
      });
   
  }

  categories: PostCategory [] = this.service.postCategories;

  // function to save post
  postSubmit(){
    if (this.addNew) {
      this.service.addPost(this.post).subscribe(
        (post) => {
          console.log("post added")
          this.router.navigate(['/blog'])
          this.post = new PostModel(); 
        },
        (error) => {
          console.log("failed to add post")
        } 
      );
      
    } else {
      this.service.updatePost(this.id, this.post).subscribe(
        (post) => {
          console.log("post updated")
          this.router.navigate(['/blog'])
          this.post = new PostModel(); 
        },
        (error) => {
          console.log("failed to update post")
        }
      );
    }

    // this.service.addPost(this.post)
   
    
  }
  
}
