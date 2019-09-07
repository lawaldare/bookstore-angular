import { GeneralService } from './services/general.service';
import { BookService } from './services/book.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private bookService: BookService, private toastr: ToastrService, private generalService: GeneralService) { }

  ngOnInit() {
  }


  onSubmit(searchForm){
    this.loading = true;
    this.generalService.changeState(true);
    this.searchedBook = searchForm.value.bookName;
    this.bookService.searchBooks(this.searchedBook).subscribe(data => {
    this.searchedBookArray = data['items'];
    this.generalService.changeState(false);
    this.loading = false;
    this.toastr.success('Results successfully found');
    console.log(this.searchedBookArray)
    }, error => {
      this.toastr.error(error.message);
      this.generalService.changeState(false);
      console.log(error);
    })
    }
}
