import { AboutComponent } from './about/about.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path:'blog', component: BlogComponent, children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full'},
      { path: 'posts', component: PostListComponent},
      { path: 'addpost', component: PostFormComponent},
      { path: ':id/post/edit', component: PostFormComponent},
      { path: ':id/post', component: PostDetailComponent}
    ]
  },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
