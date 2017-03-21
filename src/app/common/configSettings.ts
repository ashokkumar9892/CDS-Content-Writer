/**
 * Created by A779806 on 3/14/2017.
 */


import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable, EventEmitter } from '@angular/core';
import {Observable } from 'rxjs/Observable';

//simple service to hold the configSettingsService object.
@Injectable()
export class configSettingsService {
  obj: any;



  constructor() {

    if(sessionStorage.getItem("token") ==null)sessionStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTY3NTM1OCwiZXhwIjoxNDg5NzYxNzU4LCJpYXQiOjE0ODk2NzUwNTgsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.v-sDLdk0Kv9gaEdS8RsQs4AQ9dhlNOys1oXoaly9O94');

  }

  getHeader() {



      var jwt = sessionStorage.getItem("token");
      let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
      if (jwt) {
        // headers.append('Authorization', 'Bearer ' + jwt);
        headers.append('Authorization', jwt);
      }
      //headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTU5NTg2NywiZXhwIjoxNDg5NjgyMjY3LCJpYXQiOjE0ODk1OTU1NjcsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.vL3q3P0rB0Fc9rpjSCCsp7xO9YJE3imzo8yUPrO_Ae0');
      headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36');
      headers.append('Accept-Encoding', 'gzip, deflate, sdch, br');

      headers.append('Cookie', 'ASP.NET_SessionId=lq0n3u4to1mpp5ajhasq504f');

      //headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTUyNDI5OCwiZXhwIjoxNDg5NjEwNjk4LCJpYXQiOjE0ODk1MjM5OTgsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.DAvhgNxOC1LewCPw5J1MH1OQnYEb7dn3EMNNWwizLBE');
      headers.append('Access-Control-Allow-Origin', '*');


      this.obj = headers;
      return this.obj;
  }



}

