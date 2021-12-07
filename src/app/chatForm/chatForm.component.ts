import { formatDate } from '@angular/common';
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
    this.cs.newMessage(newPost, "JordanNeal").subscribe();
    this.clearForm();
    this.refreshText();
    this.ngOnInit();
  }
  clearForm() {
    this.form.setValue({
      username: "",
      message: ""
    });
  }
  refreshText() {
    this.cs.getMessages("JordanNeal").subscribe(data => {
      this.allPosts = data;
    });
  }
  ngOnInit() {
    this.refreshText();
  }
}