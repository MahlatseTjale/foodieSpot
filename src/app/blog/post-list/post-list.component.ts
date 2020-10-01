import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PostsService } from './../posts.service';
import { PostModel } from './../post.model';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // post: PostModel;
  postList: PostModel[] = [];
  subPostsChanged: Subscription;

  constructor( private service: PostsService, private router: Router )
   { }

  ngOnInit(): void {
    this.subPostsChanged = this.service.postsChanged.subscribe((posts) => {
      this.postList = posts;
    });

    this.service.getAllPosts().subscribe(
      (posts: PostModel[]) => {
      this.postList = posts;
      },
      (error) => {

      }

    );
  }

  ngOnDestroy() {
    if (this.subPostsChanged) {
      this.subPostsChanged.unsubscribe();
    }
  }

  // viewPost(){
  //   this.router.navigate(['/posts', this.post.id])
  // }
}
