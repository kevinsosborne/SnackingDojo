import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component"
import { SnackingdojoComponent } from "./snackingdojo/snackingdojo.component"
import { DetailsComponent } from "./snackingdojo/details/details.component"
import { AdminComponent } from "./admin/admin.component"

const routes: Routes = [
    { path: "", component: SnackingdojoComponent },
    { path: "details/:id", component: DetailsComponent },
    { path: "admin", component: AdminComponent }
    // { path: "", pathMatch: "full", redirectTo: "/questions" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
