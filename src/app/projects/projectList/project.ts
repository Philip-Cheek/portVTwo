import { Component } from './component';
import { Deployment } from './deployment';

export class Project{
	name:string;
	photoURL:string;
	source:string;
	stack:string[];
	type:string;
	status:string;
	components:Component[];
	deployment:Deployment;
	open:boolean;
}