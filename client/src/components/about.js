import React from 'react';

function About(props) {
  return (
    <main>
      <h1>About</h1>
      <div className='insights'>
        <div className='prediction'>
          <h2>The Project</h2>
          <br />
          <p>
            Startup valuation is a crucial and often complex process, as it involves predicting the future potential and
            success of a company that is still in its early stages of growth. Traditional methods of valuation such as
            the discounted cash flow method and the Berkus approach can be time-consuming and subjective. To assist
            startup investors with their decisions, in this project we aim to create a more reliable and accurate way to
            value startups, by using a few different ML models to compare and predict its valuation. Check out the full
            documentation on GitHub here:
            <a
              href='https://github.com/rudramantri/Startup-Valuation-with-Machine-Learning'
              target='_blank'
              rel='noopener noreferrer'>
              {' '}
              github.com/rudramantri/Startup-Valuation-with-Machine-Learning
            </a>
          </p>
        </div>
        <div className='prediction'>
          <h2>About the Author</h2>
          <br />
          <p>This project was created by:</p>
          <h3>Rudra Mantri</h3>
          <p>Developer and Machine Learning Engineer</p>
        </div>
      </div>
    </main>
  );
}

export default About;
