import React from 'react';
import { HomePageComponent } from './style/HomePage.Style';

const HomePage = (props) => {
  return (
    <HomePageComponent>
      <h1>Witamy na stronie przychodni</h1>
      <p>Zachęcamy naszych pacjentów zarejestrowania się w serwisie. Konto umożliwi Wam:</p>
      <ul>
        <li>sprawdzienie wolnych terminów wizyt</li>
        <li>rejestrację na wizytę</li>
        <li>kontakt z lekarzem, także przed planowaną wizytą</li>
        <li>sprawdzenie wyników badań</li>
        <li>odebranie recept</li>
      </ul>
    </HomePageComponent>
  );
};

export default HomePage;
