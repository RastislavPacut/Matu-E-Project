
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/model/question.model';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private savedQuestionsSubject = new BehaviorSubject<Question[]>([]);
  savedQuestions$ = this.savedQuestionsSubject.asObservable();

  constructor() {}

  saveQuestion(question: Question) {
    const savedQuestions = this.savedQuestionsSubject.value;
    question.isSaved = true;
    this.savedQuestionsSubject.next([...savedQuestions, question]);
  }

  removeQuestion(question: Question) {
    const savedQuestions = this.savedQuestionsSubject.value;
    question.isSaved = false;
    const updatedQuestions = savedQuestions.filter((q) => q.id !== question.id);
    this.savedQuestionsSubject.next(updatedQuestions);
  }
}