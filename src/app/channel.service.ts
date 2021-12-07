import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

export interface Post {
  username: string,
  message: string,
  id: string,
  created_on: Date,
  updated_on: Date | undefined
}
@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  public allPosts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  private apiUrl = "http://73.19.65.35:3500/api";
  constructor(private http: HttpClient) { }
    // create
    newMessage(post: Post, channel: string): Observable<Post> {
      return this.http.post<Post>(`${this.apiUrl}/channel/${channel}`, post);
    }
    // read
    getChannelNames(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/channel`);
    }
    getMessages(channel: string): Observable<Post[]> {
      return this.http.get<Post[]>(`${this.apiUrl}/channel/${channel}`);
    }
    // update
    patchMessage(post: Post[]): Observable<Post[]>{
      return this.http.patch<Post[]>(`${this.apiUrl}`, post)
    }
    // delete
    deleteMessage(channel: string): Observable<any>{
      return this.http.delete<any>(`${this.apiUrl}/${channel}`)
    }

    updatePosts(channel: string) {
      this.getMessages(channel).subscribe(data => {
        this.allPosts$.next(data);
      });
    }
}