import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
        
    @Injectable({providedIn: 'root'}) export class GeneralService{

        private _presentStateSource = new BehaviorSubject<any>(false);
        public state$ = this._presentStateSource.asObservable() as Observable<any>;

        constructor() { }
        
        changeState(loadingState) {
            this._presentStateSource.next(loadingState);
        }
    }