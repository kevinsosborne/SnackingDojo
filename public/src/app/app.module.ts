import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatabaseService } from "./database.service"
import { HttpModule } from "@angular/http"
import { FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SnackingdojoComponent } from './snackingdojo/snackingdojo.component';
import { DetailsComponent } from './snackingdojo/details/details.component';
import { SearchPipe } from './search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdSidenavModule, MdDialogModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDialog, MdButton } from '@angular/material';
import { TruncatePipe } from './truncate.pipe';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SnackingdojoComponent,
    DetailsComponent,
    SearchPipe,
    TruncatePipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdDialogModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule

  ],
  providers: [DatabaseService,MdDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
