import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { HeaderComponent } from './blog/header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

import { StickyNavModule } from 'ng2-sticky-nav';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogComponent,
    PostFormComponent,
    PostDetailComponent,
    PostListComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StickyNavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
