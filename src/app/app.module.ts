import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UIShellModule } from 'carbon-components-angular';
import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
// import { PaginationModel } from 'carbon-components-angular/pagination/pagination.module';
import { PaginationModule } from 'carbon-components-angular/pagination/pagination.module';
import {
	Component,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		PaginationModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }