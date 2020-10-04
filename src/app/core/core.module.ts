import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { END_POINTS, AuthService } from './services/auth.service';
import { CoreState } from './store/state/core.state';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

const AUTH_API = { provide: END_POINTS, multi: true, useClass: AuthService};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([CoreState]),
    HttpClientModule
  ],
  providers: [AUTH_API]
})
export class CoreModule { }
