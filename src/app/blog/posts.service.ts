import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http'
import { tap, map } from 'rxjs/operators';

import { PostModel, PostCategory } from './post.model';



@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/posts'
  postsChanged: Subject<PostModel[]> = new Subject<PostModel[]>();


  posts: PostModel[] = [];

   postCategories: PostCategory [] = [
    {
      name: "Breakfast"
    },
    {
      name: "Sandwich"
    },
    {
      name: "Desserts"
    }
  ]

  
  constructor(private http: HttpClient) { }

  //function to get all posts
  getAllPosts(): Observable<PostModel[]>{
    // const postsCopy = [...this.posts]
    // return postsCopy;

    const authToken = 'abc12345';
    const myHeaders = new HttpHeaders({ 'my-auth-token': authToken });
    const myParams = new HttpParams().set('my-auth-token', authToken);

    return this.http.get<PostModel[]>(
      this.apiUrl,
      {
        headers: myHeaders,
        params: myParams
      }
    )
    .pipe(
      tap((posts: PostModel[]) => {
        this.posts = [...posts];
      })
    );
  }

  //function to add new post to posts array
  addPost(newPost: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, newPost);
  }

  //function to get single post
  getPost(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(this.apiUrl + "/" + postId);
    // const post = this.posts.find(p => {
    //   return p.id === postId;
    // });
    // return { ...post };
  }

  updatePost(id: number, post: PostModel) {
    // update a post based on id
    // return this.http.put(this.apiUrl,id)
    return this.http.put(`${this.apiUrl}/${id}`, post)

  }

  deleteProduct(postId: number): Observable<any> {
    // delete a product based on id
    return this.http.delete(`${this.apiUrl}/${postId}`)
      .pipe(
        tap(() => {
          const index = this.posts.findIndex(p => {
            return p.id === postId;
          });

          this.posts.splice(index, 1);

          this.postsChanged.next([...this.posts]);
        })
      );
  }

}
