import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

itemsList: Array<any> = [];
searchForm: FormGroup;

constructor(private formBuilder: FormBuilder,private http: HttpClient) { 
  this.searchForm = this.formBuilder.group({
    name: '',
  });
}

onSubmit(value) {

  this.itemsList = [];
  let urlGET = `https://search-api-tribal.herokuapp.com/v1/search?query=${value.name}`;

  this.http.get<any[]>(urlGET).subscribe(data => {
    data["query"].forEach(element => {
      this.itemsList.push({name: element.name, kind: element.kind, date: element.date, originapi: element.originapi});
    });
  });

}

}
