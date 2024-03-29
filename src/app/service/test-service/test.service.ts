import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, from, map, Observable } from 'rxjs';
import { Test } from '../../model/test.model';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Question } from '../../model/question.model';
import { Article } from '../../model/article.model';
import { SavedTest } from '../../model/saved-test.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private firestore: Firestore) {}

  getTestsYears(subCat: string): Observable<string[]> {
    const dataCollection = collection(this.firestore, 'test');

    return from(
      getDocs(dataCollection).then((querySnapshot) => {
        return querySnapshot.docs
          .filter((doc) => {
            const subjectParts = doc.id.split('-');
            const subject =
              subjectParts.length > 1 ? subjectParts[1].toLowerCase() : '';
            return subCat === subject;
          })

          .map((doc) => {
            const year = doc.id.split('-')[0];
            return year;
          });
      }),
    );
  }

  getTest(subCat: string, year: string): Observable<Test> {
    //Pristup ku kkolekcii test
    const dataCollection = collection(this.firestore, 'test');
    //Prijmanie subkategorie a roku, vytvori sa id ako v databaze
    const id = year + '-' + subCat.toUpperCase();
    //Referencia na dany dokument v kolekcii na zaklade id
    const documentRef = doc(dataCollection, id);
    //Pristup ku kolekcii articles
    const articlesCollectionRef = collection(documentRef, 'articles');
    //Pristup ku kolekcii questions
    const questionsCollectionRef = collection(documentRef, 'questions');

    //Forkjoin - funkcia ktora dokaze naraz vykonat funkcie
    //Potiahnutie troch kolekcii z firebase
    //Premena udajov na array(id, array articlov, array questions)
    return forkJoin([
      //1. funkcia
      from(
        getDoc(documentRef).then((snapshot) => {
          if (snapshot.exists()) {
            //v prvej funkcii returnes id
            return snapshot.id;
          } else {
            throw new Error('Document not found');
          }
        }),
      ),
      //2. funkcia
      from(
        getDocs(articlesCollectionRef).then((querySnapshot) => {
          //querySnapshot.docs - vsetky udaje z databazy, .map - prechadza datami z databazy
          const articles: Article[] = querySnapshot.docs.map((doc) => {
            //returnne jeden article a ulozi ho do arrayu articlov
            return {
              id: doc.id,
              url: doc.data()['url'],
            } as Article;
          });
          //return arrayu articlov
          return articles.sort((a, b) => a.id.localeCompare(b.id));
        }),
      ),
      //3.funkcia
      from(
        getDocs(questionsCollectionRef).then((querySnapshot) => {
          const questions: Question[] = querySnapshot.docs.map((doc) => {
            const options = doc.data()['options'];
            //returnne jednu question a ulozi ju do arrayu questions
            return {
              id: doc.id,
              articleId: doc.data()['articleId'],
              correctAnswer: doc.data()['correctAnswer'],
              options: options,
              text: doc.data()['text'],
              image: doc.data()['image'],
            } as Question;
          });
          //return arrayu questions
          return questions;
        }),
      ),
    ]).pipe(
      //Spojenie udajov do objektu test aj s returnom
      map(([testData, articlesData, questionsData]) => {
        const test: Test = {
          id: testData,
          articles: articlesData,
          questions: questionsData,
        };
        return test;
      }),
    );
  }
  saveUserTest(uid: string, savedTest: SavedTest): void {
    const dataCollection = collection(this.firestore, 'users');
    const documentRef = doc(dataCollection, uid);
    const savedTestsCollectionRef = collection(documentRef, 'savedTests');
    const savedTestDocumentRef = doc(savedTestsCollectionRef);
    setDoc(savedTestDocumentRef, savedTest);
  }
}
