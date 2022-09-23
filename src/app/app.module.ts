import { Store, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './feature/search/page/search-page/search-page.component';
import { HistoryPageComponent } from './feature/history/page/history-page/history-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { AngularMaterialModule } from './angular-material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search/search-effects';
import { searchReducer } from './store/search/search-reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SearchFormComponent } from './feature/search/component/search-form/search-form.component';
import { ResultPageComponent } from './feature/search/component/result-page/result-page.component';
import { SearchQueryHistoryListComponent } from './feature/history/component/search-query-history-list/search-query-history-list.component';
import { SearchResultHistoryListComponent } from './feature/history/component/search-result-history-list/search-result-history-list.component';
import { QueryHistoryListItemComponent } from './feature/history/component/query-history-list-item/query-history-list-item.component';
import { historyReducer } from './store/history/history-reducer';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HistoryPageComponent,
    NavComponent,
    SearchFormComponent,
    ResultPageComponent,
    SearchQueryHistoryListComponent,
    SearchResultHistoryListComponent,
    QueryHistoryListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      search: searchReducer,
      history: historyReducer
    }),
    EffectsModule.forRoot([SearchEffects]),
  ],
  providers: [
    Store,
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi   : true,
    // },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
