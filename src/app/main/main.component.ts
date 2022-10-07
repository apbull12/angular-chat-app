import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {RoomInfo} from "../types/room-info";
import {ChatMessage} from "../types/chat-message";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  rooms: RoomInfo[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  messages: ChatMessage[] = [];
  chatForm = this.fb.group({
    message: [null, Validators.required],
    timestamp: '',
    user: 'Arun'
  })

  constructor(private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder) {
    this.rooms = [{
      name: "Public"
    },
      {
        name: "Private"
      }
    ]
  }

  onSend() {
    if(this.chatForm.value.message != null) {
      this.messages.push({message: this.chatForm.value.message, timestamp: new Date().toDateString(), user: 'Arun'});
    }
  }
}
