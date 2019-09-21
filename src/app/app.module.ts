import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GridComponent } from './grid/grid.component';
import { FormsModule } from '@angular/forms';
import { FileHandlerService } from './Services/filehandler.service';
// import { ConfigService } from './Services/config.service';
import { TempComponent } from './temp/temp.component';
import { ngfModule } from 'angular-file';
import { RegisterationComponent } from './registeration/registeration.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { NotifierModule } from 'angular-notifier';
import { RegistrationDirective } from './registeration/registrationDirective';
// import { PagerService } from 'services/index';


// const appInitializerFn = (appConfig: ConfigService) => {
//   return () => {
//     return appConfig.loadAppConfig();
//   };
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GridComponent,
    TempComponent,
    RegisterationComponent,
    FilterPipe,
    RegistrationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ngfModule,
    NotifierModule.withConfig( {
      // Custom options in here
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 2000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 10
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 500,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 500,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 500,
          easing: 'ease'
        },
        overlap: 150
      }
    } )

  ],
  providers: [FileHandlerService,
   // PagerService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
   // ConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializerFn,
    //   multi: true,
    //   deps: [ConfigService]
    // }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
