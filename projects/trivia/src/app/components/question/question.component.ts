import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Question, Answer, User } from 'shared-library/shared/model';
import { AppState, appState, categoryDictionary } from '../../store';
import { Store, select } from '@ngrx/store';
import { QuestionActions } from 'shared-library/core/store/actions';
import { Utils } from 'shared-library/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnDestroy {

  question: Question;
  categoryName: string;
  @Input() userDict: { [key: string]: User };

  @Output() answerClicked = new EventEmitter<number>();
  @Output() continueClicked = new EventEmitter();

  answeredText: string;
  correctAnswerText: string;
  doPlay = true;
  categoryDictionary: any;
  subs: Subscription[] = [];

  constructor(private store: Store<AppState>, private questionAction: QuestionActions, private utils: Utils) {
    this.answeredText = '';
    this.correctAnswerText = '';
    this.subs.push(this.store.select(categoryDictionary).subscribe(categories => {
      this.categoryDictionary = categories;
      this.subs.push(this.store.select(appState.coreState).pipe(select(s => s.questionOfTheDay)).subscribe(questionOfTheDay => {
        if (questionOfTheDay) {
          this.question = questionOfTheDay;
          this.question.answers = utils.changeAnswerOrder(questionOfTheDay.answers);
          this.question.answers.forEach((item, index) => {
            if (item.correct === true) {
              this.correctAnswerText = item.answerText;
            }
          });
          this.categoryName = this.question.categoryIds.map(category => {
            if (this.categoryDictionary[category]) {
              return this.categoryDictionary[category].categoryName;
            } else {
              return '';
            }
          }).join(',');
        }
      }));
    }));


  }

  answerButtonClicked(answer: Answer) {
    if (this.doPlay) {
      this.answeredText = answer.answerText;
      this.doPlay = false;
      const index = this.question.answers.findIndex(x => x.answerText === answer.answerText);
      this.answerClicked.emit(index);
    }
  }

  getNextQuestion() {
    this.answeredText = '';
    this.correctAnswerText = '';
    this.doPlay = true;
    this.store.dispatch(this.questionAction.getQuestionOfTheDay());

  }

  ngOnDestroy(): void {
    this.utils.unsubscribe(this.subs);
  }

}
