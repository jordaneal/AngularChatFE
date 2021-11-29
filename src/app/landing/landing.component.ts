import { Component, OnInit } from '@angular/core';
import { ChannelService, Post } from '../channel.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  data: string[] = [];
  posts: string[] = [];
  messages: Post[] = [];

  constructor(private cs: ChannelService) { }

  ngOnInit() {
    this.cs.getMessages("JordanNeal").subscribe(data => {
      console.log(data);
      this.messages = data;
    });

    // this.cs.getChannelNames().subscribe(data => {
    //   console.log(data);
    //   this.posts = data;
    // });
  }
}
