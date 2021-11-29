import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

export interface Post {
  username: string,
  message: string,
  id: string,
  created_on: Date,
  updated_on: Date
}
@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = "http://73.19.65.35:3500/api";
  constructor(private http: HttpClient) { }
    // create
    newMessage(channel: Post): Observable<Post> {
    console.log("newMessage fired on channel: " + channel);
    return this.http.post<Post>(`${this.apiUrl}/posts`, channel);
    }
    // read
    getChannelNames(): Observable<string[]> {
    console.log("getChannelNames fired");
    return this.http.get<string[]>(`${this.apiUrl}/channel`);
    }
    getMessages(channel: string): Observable<Post[]> {
    console.log("getMessages fired on channel: " + channel);
    return this.http.get<Post[]>(`${this.apiUrl}/channel/${channel}`);
    }
    // update
    patchMessage(channel: Post[]): Observable<Post[]>{
        console.log("patchMessage fired on channel: " + channel);
        return this.http.patch<Post[]>(`${this.apiUrl}`, channel)
    }
    // delete
    deleteMessage(channel: string): Observable<any>{
        console.log("deleteMessage fired on channel: " + channel);
        return this.http.delete<any>(`${this.apiUrl}/${channel}`)
    }
}