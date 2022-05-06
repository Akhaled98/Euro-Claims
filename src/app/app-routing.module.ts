import { AuthGuard } from './core/guard/auth.guard';
import { Error404Component } from "./error-pages/error404/error404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    // component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: "/authentication/login", pathMatch: "full" },
      {
        path: "user-pages",
        loadChildren: () =>
          import("./user-pages/user-pages.module").then(
            (m) => m.UserPagesModule
          ),
      },
      {
        path: "error-pages",
        loadChildren: () =>
          import("./error-pages/error-pages.module").then(
            (m) => m.ErrorPagesModule
          ),
      },
      {
        path: "assignment",
        loadChildren: () =>
          import("./assignment/assignment.module").then(
            (m) => m.AssignmentModule
          ),
      },
      {
        path: "previews",
        loadChildren: () =>
          import("./previews/previews.module").then((m) => m.PreviewsModule),
      },
      {
        path: "agenda",
        loadChildren: () =>
          import("./agenda/agenda.module").then((m) => m.AgendaModule),
      },
      {
        path: "chats",
        loadChildren: () =>
          import("./chats/chats.module").then((m) => m.ChatsModule),
      },
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "client",
        loadChildren: () =>
          import("./client/client.module").then((m) => m.ClientModule),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
