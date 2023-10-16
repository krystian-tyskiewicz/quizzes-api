import { Injectable } from '@nestjs/common';
import { Quiz } from '../types';

@Injectable()
export class QuizzesService {
  getQuizzes(): Quiz[] {
    const quizzes = [
      {
        name: 'HTML',
        questions: [
          {
            title: 'What type of a language is HTML?',
            answers: [
              { title: 'Network Protocol' },
              { title: 'Programming Language' },
              { title: 'Scripting Language' },
              { title: 'Markup Language', isCorrect: true },
            ],
          },
          {
            title: 'What should be the first tag in any HTML Document?',
            answers: [
              { title: '<head>' },
              { title: '<title>' },
              { title: '<html>' },
              { title: '<!doctype html>', isCorrect: true },
            ],
          },
          {
            title: 'What tag is used to display a picture in a HTML page?',
            answers: [
              { title: 'Img' },
              { title: 'Src' },
              { title: 'Picture' },
              { title: 'Image', isCorrect: true },
            ],
          },
          {
            title: 'HTML are web pages read and rendered by',
            answers: [
              { title: 'Server' },
              { title: 'Web Browser', isCorrect: true },
              { title: 'Compiler' },
              { title: 'Interpreter' },
            ],
          },
          {
            title: 'What is the correct HTML tag for inserting a line break?',
            answers: [
              { title: '<br />', isCorrect: true },
              { title: '<lb />' },
              { title: '<break />' },
              { title: '<nbsp>' },
            ],
          },
          {
            title: 'What is the correct HTML for making a hyperlink?',
            answers: [
              { title: 'url="http://mcqsets.com">MCQ Sets Quiz' },
              { title: '<a name="http://mcqsets.com">MCQ Sets Quiz</a>' },
              {
                title: '<a href="http://mcqsets.com">MCQ Sets Quiz</a>',
                isCorrect: true,
              },
              { title: '<http://mcqsets.com</a>' },
            ],
          },
          {
            title: 'HTML documents are saved in',
            answers: [
              { title: 'None of above' },
              { title: 'ASCII text', isCorrect: true },
              { title: 'Special binary format' },
              { title: 'Machine language codes' },
            ],
          },
        ],
      },
      {
        name: 'Cars',
        questions: [
          {
            title:
              'What is the best-selling British car model of all time, known for its simple design and affordability?',
            answers: [
              { title: 'MINI', isCorrect: true },
              { title: 'Morris Minor' },
              { title: 'Austin Metro' },
            ],
          },
          {
            title:
              'Which British car brand produced the iconic DB5, featured in James Bond films such as "Goldfinger"?',
            answers: [
              { title: 'Bentley' },
              { title: 'Aston Martin', isCorrect: true },
              { title: 'Lotus' },
            ],
          },
          {
            title:
              'The Mini Cooper S is known for its rally successes in the 1960s. What is the name of the racing legend associated with driving the Mini?',
            answers: [
              { title: 'Stirling Moss' },
              { title: 'Paddy Hopkirk', isCorrect: true },
              { title: 'Jackie Stewart' },
            ],
          },
          {
            title:
              'Although the Ford Escort was incredibly popular, it wasn’t the best-selling family saloon of the 1970’s. Which of the following was?',
            answers: [
              { title: 'Austin Allegro' },
              { title: 'Vauxhall Cavalier' },
              { title: 'Ford Cortina Stewart', isCorrect: true },
            ],
          },
          {
            title: 'The ornament on the bonnet of a Rolls Royce is called…',
            answers: [
              { title: 'Spirit of Ecstasy', isCorrect: true },
              { title: 'Flying Lady' },
              { title: 'Elegant Emissary' },
            ],
          },
          {
            title:
              'The Defender is a legendary off-road vehicle produced by which British automaker?',
            answers: [
              { title: 'Land Rover', isCorrect: true },
              { title: 'Range Rover' },
              { title: 'Jaguar' },
            ],
          },
          {
            title: 'Which British manufacturer makes the model ‘Elise’?',
            answers: [
              { title: 'McLaren' },
              { title: 'Lotus', isCorrect: true },
              { title: 'Aston Martin' },
            ],
          },
        ],
      },
    ];

    return quizzes;
  }
}
