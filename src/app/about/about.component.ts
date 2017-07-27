import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-about',
  template: `
  	<div id = 'about'>
	<div id = 'aWrap'>
		<p>My name is Philip Cheek. I am 23 years old and I currently live in the Bay Area. My primary technical interests involve both the backend and frontend development of Web Applications. I am passionate about utilizing new technologies and building tools of my own to deliver secure, fresh, and innovative experiences to end users.</p>
		<p>In addition, I am also merging my love for web development with a budding interest in game development, as I am currently developing an isometric multiplayer browser game. Once the project reaches completion, I hope to take the engine and tools that I am building and spin them into multi-purpose utilities to be made available to other broswer game devs should they find them useful.</p>
		<p>I have always bore an obsession with technology and have fed my passion through both programming and learning about new technologies, design patterns, data structures, and emerging fields.</p>
		<p>Please visit my <a routerLink = "/contact" routerLinkActive="active">contact page</a> and send me a note if you would like to either work with me or ask my any questions.</p>
	</div>
	<h1>About Me</h1>
</div>
  `,
  styleUrls: ['./about.component.css']
})


export class AboutComponent  {
	constructor(private router:Router) {}
}