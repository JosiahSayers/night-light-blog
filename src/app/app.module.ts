import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { PostComponent } from './post/post.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { AuthorComponent } from './post/author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    SpinnerComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
