import { BookService } from "./services/book.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import {
  EMPTY,
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  searchedBookArray: any[];
  information = "Start searching for books";

  public bookSearched = new FormControl("");

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookSearched.valueChanges
      .pipe(
        filter(Boolean),
        debounceTime(300),
        switchMap((term) => this.bookService.searchBooks(term)),
        map((data) => (this.searchedBookArray = data.items))
      )
      .subscribe();
  }
}
