import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChannelService, Post } from '../channel.service';


@Component({
  selector: 'app-chatForm',
  templateUrl: './chatForm.component.html',
  styleUrls: ['./chatForm.component.scss']
})
export class ChatFormComponent implements OnInit {
  constructor(private cs: ChannelService) { }
  allPosts: Post[] = [];
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(500)
    ])
  });
  onSubmit() {
    let newPost: Post = {
      username: this.form.value.username,
      message: this.form.value.message,
      id: "",
      created_on: new Date(),
      updated_on: undefined
    }
    this.cs.newMessage(newPost, "JordanNeal").subscribe(data => {
      this.clearForm();
      this.refreshText();
    });
  }
  clearForm() {
    this.form.setValue({
      username: "",
      message: ""
    });
  }
  refreshText() {
    this.cs.updatePosts("JordanNeal");
  }
  ngOnInit() {
    this.cs.allPosts$.subscribe(data => {
      this.allPosts = data;
    });
    this.refreshText();
  }
}