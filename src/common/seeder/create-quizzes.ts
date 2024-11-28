import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { QuizzesService } from '../../quizzes/services/quizzes.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const quizzesService = app.get(QuizzesService);

  const carsQuiz = getCarsQuiz();
  await quizzesService.create(carsQuiz);

  const geographyQuiz = getGeographyQuiz();
  await quizzesService.create(geographyQuiz);

  const moviesQuiz = getMoviesQuiz();
  await quizzesService.create(moviesQuiz);

  await app.close();
}

bootstrap();

const getCarsQuiz = () => ({
  name: 'Cars Quiz',
  questions: [
    {
      name: 'What does ABS stand for in car terms?',
      answers: [
        { name: 'Anti-lock Braking System', isCorrect: true },
        { name: 'Automatic Braking System', isCorrect: false },
        { name: 'Anti-Break System', isCorrect: false },
      ],
    },
    {
      name: 'Which country is home to the car manufacturer Ferrari?',
      answers: [
        { name: 'France', isCorrect: false },
        { name: 'Italy', isCorrect: true },
        { name: 'Germany', isCorrect: false },
      ],
    },
    {
      name: 'What type of car is a Tesla Model S?',
      answers: [
        { name: 'Electric', isCorrect: true },
        { name: 'Hybrid', isCorrect: false },
        { name: 'Gasoline', isCorrect: false },
      ],
    },
    {
      name: 'What is the logo of Porsche?',
      answers: [
        { name: 'A horse', isCorrect: true },
        { name: 'A bull', isCorrect: false },
        { name: 'An eagle', isCorrect: false },
      ],
    },
    {
      name: 'In what year was the first Ford Model T released?',
      answers: [
        { name: '1918', isCorrect: false },
        { name: '1908', isCorrect: true },
        { name: '1928', isCorrect: false },
      ],
    },
    {
      name: 'Which car company produces the Civic model?',
      answers: [
        { name: 'Nissan', isCorrect: false },
        { name: 'Honda', isCorrect: true },
        { name: 'Toyota', isCorrect: false },
      ],
    },
    {
      name: "What car brand is known for the 'Three-Pointed Star' logo?",
      answers: [
        { name: 'BMW', isCorrect: false },
        { name: 'Mercedes-Benz', isCorrect: true },
        { name: 'Audi', isCorrect: false },
      ],
    },
    {
      name: 'Which of these is a luxury car brand from the UK?',
      answers: [
        { name: 'Rolls-Royce', isCorrect: true },
        { name: 'Maserati', isCorrect: false },
        { name: 'Lexus', isCorrect: false },
      ],
    },
    {
      name: 'Which of these is considered a muscle car?',
      answers: [
        { name: 'Mini Cooper', isCorrect: false },
        { name: 'Ford Mustang', isCorrect: true },
        { name: 'Toyota Prius', isCorrect: false },
      ],
    },
    {
      name: 'In car engines, what is a turbocharger used for?',
      answers: [
        { name: 'To improve fuel efficiency', isCorrect: false },
        { name: 'To increase engine power', isCorrect: true },
        { name: 'To reduce emissions', isCorrect: false },
      ],
    },
  ],
});

const getGeographyQuiz = () => ({
  name: 'Geography Quiz',
  questions: [
    {
      name: 'What is the capital of Japan?',
      answers: [
        { name: 'Beijing', isCorrect: false },
        { name: 'Seoul', isCorrect: false },
        { name: 'Tokyo', isCorrect: true },
        { name: 'Kyoto', isCorrect: false },
      ],
    },
    {
      name: 'Which continent is the Sahara Desert located on?',
      answers: [
        { name: 'Asia', isCorrect: false },
        { name: 'South America', isCorrect: false },
        { name: 'Africa', isCorrect: true },
        { name: 'Australia', isCorrect: false },
      ],
    },
    {
      name: 'Which river flows through the city of Cairo?',
      answers: [
        { name: 'Tigris', isCorrect: false },
        { name: 'Nile', isCorrect: true },
        { name: 'Amazon', isCorrect: false },
        { name: 'Yangtze', isCorrect: false },
      ],
    },
    {
      name: 'Mount Everest is located on the border between which two countries?',
      answers: [
        { name: 'India and China', isCorrect: false },
        { name: 'Nepal and China', isCorrect: true },
        { name: 'Bhutan and China', isCorrect: false },
        { name: 'Nepal and India', isCorrect: false },
      ],
    },
    {
      name: 'Which of these countries is in South America?',
      answers: [
        { name: 'Portugal', isCorrect: false },
        { name: 'Argentina', isCorrect: true },
        { name: 'Spain', isCorrect: false },
        { name: 'Italy', isCorrect: false },
      ],
    },
    {
      name: 'Which is the largest ocean on Earth?',
      answers: [
        { name: 'Atlantic Ocean', isCorrect: false },
        { name: 'Indian Ocean', isCorrect: false },
        { name: 'Pacific Ocean', isCorrect: true },
        { name: 'Arctic Ocean', isCorrect: false },
      ],
    },
    {
      name: 'What is the smallest country in the world?',
      answers: [
        { name: 'Monaco', isCorrect: false },
        { name: 'San Marino', isCorrect: false },
        { name: 'Vatican City', isCorrect: true },
        { name: 'Liechtenstein', isCorrect: false },
      ],
    },
    {
      name: "Which US state is known as the 'Sunshine State'?",
      answers: [
        { name: 'California', isCorrect: false },
        { name: 'Florida', isCorrect: true },
        { name: 'Texas', isCorrect: false },
        { name: 'Nevada', isCorrect: false },
      ],
    },
    {
      name: 'Which mountain range is known as the longest above-water mountain range?',
      answers: [
        { name: 'Rocky Mountains', isCorrect: false },
        { name: 'Alps', isCorrect: false },
        { name: 'Andes', isCorrect: true },
        { name: 'Himalayas', isCorrect: false },
      ],
    },
    {
      name: 'What is the official language of Brazil?',
      answers: [
        { name: 'Spanish', isCorrect: false },
        { name: 'Portuguese', isCorrect: true },
        { name: 'French', isCorrect: false },
        { name: 'Italian', isCorrect: false },
      ],
    },
  ],
});

const getMoviesQuiz = () => ({
  name: 'Movies & TV Shows Quiz',
  questions: [
    {
      name: "Who played Jack in the movie 'Titanic'?",
      answers: [
        { name: 'Brad Pitt', isCorrect: false },
        { name: 'Leonardo DiCaprio', isCorrect: true },
        { name: 'Tom Hanks', isCorrect: false },
        { name: 'Johnny Depp', isCorrect: false },
      ],
    },
    {
      name: "What is the name of the kingdom in 'Frozen'?",
      answers: [
        { name: 'DunBroch', isCorrect: false },
        { name: 'Corona', isCorrect: false },
        { name: 'Arendelle', isCorrect: true },
        { name: 'Montenaro', isCorrect: false },
      ],
    },
    {
      name: "Which movie features the line, 'May the Force be with you'?",
      answers: [
        { name: 'Harry Potter', isCorrect: false },
        { name: 'The Lord of the Rings', isCorrect: false },
        { name: 'Star Wars', isCorrect: true },
        { name: 'The Matrix', isCorrect: false },
      ],
    },
    {
      name: 'Who played Iron Man in the Marvel Cinematic Universe?',
      answers: [
        { name: 'Chris Evans', isCorrect: false },
        { name: 'Robert Downey Jr.', isCorrect: true },
        { name: 'Chris Hemsworth', isCorrect: false },
        { name: 'Mark Ruffalo', isCorrect: false },
      ],
    },
    {
      name: "In which city is the sitcom 'Friends' set?",
      answers: [
        { name: 'Chicago', isCorrect: false },
        { name: 'New York', isCorrect: true },
        { name: 'Los Angeles', isCorrect: false },
        { name: 'San Francisco', isCorrect: false },
      ],
    },
    {
      name: "What year did the first 'Harry Potter' movie release?",
      answers: [
        { name: '1999', isCorrect: false },
        { name: '2001', isCorrect: true },
        { name: '2003', isCorrect: false },
        { name: '2005', isCorrect: false },
      ],
    },
  ],
});
