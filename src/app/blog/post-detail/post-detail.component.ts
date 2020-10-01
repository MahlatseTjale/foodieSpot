import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';


import { PostModel } from './../post.model';
import { PostsService } from './../posts.service';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: PostModel;
  id: number;
  subPostId: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PostsService) { }

  ngOnInit(): void {

    // read parameter from url
    this.subPostId =  this.route.paramMap.subscribe((map) => {
      this.id = +map.get('id');

      // get the post with read id
      this.service.getPost(this.id).subscribe(
        (post) => {
          this.post = post;
        },
        (error) => {
          console.log("Couldnt retrieve Post From Server")
        }
      ); 
    });
  }

  Edit() {
    this.router.navigate(["/blog", this.id, "post" , "edit"]); 
  }

  Delete() {
    if (window.confirm('Are you sure?')) {
      this.service.deleteProduct(this.post.id).subscribe(
        (post) => {
          this.router.navigate(['/blog/posts']);
          console.log("deleted")
        },
        (error: any) => {
          console.log('Delete product failed.');
          console.log('Error:', error);
        }
      );

    }
  }

  ngOnDestroy() {
    if (this.subPostId) {
      this.subPostId.unsubscribe()
    }
  }
}
