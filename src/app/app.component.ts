import { BookService } from './services/book.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookstore';
  searchedBook: string;
  searchedBookArray: any[];
  loading: boolean = false;
  information: string = "Start searching for books."

  constructor(private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit() {
  }


  searchBook(form: NgForm){
    this.loading = true;
    this.searchedBookArray = [];
    this.searchedBook = form.value.bookName;
    this.bookService.searchBooks(this.searchedBook).subscribe(data => {
    this.searchedBookArray = data['items'];
    if(this.searchedBookArray === undefined) this.information = "Sorry, no results for your search";
    this.loading = false;
    form.resetForm();
    }, error => {
      this.toastr.error(error.message || error.error.message);
    })
    }
}
