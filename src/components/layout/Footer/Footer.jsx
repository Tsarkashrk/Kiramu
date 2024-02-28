import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__project">
        <h2 className="footer__logo">Kiramu</h2>
        <div className="footer__author">
          © Copyright Kiramu 2023
          <br></br>
          Developed by: tsarka
        </div>
      </div>

      {/* <div className='footer__contacts'>
        <div className='footer__links'>
          <a className="footer__link" href="https://github.com/Tsarkashrk" target='_blank'>
            <ion-icon name='logo-github'></ion-icon>
          </a>
          <a className="footer__link" href="https://www.linkedin.com/in/tsarka/" target='_blank'>
            <ion-icon name='logo-linkedin'></ion-icon>
          </a>
          <a className="footer__link" href="https://www.instagram.com/tsarka.shrk/" target='_blank'>
            <ion-icon name='logo-instagram'></ion-icon>
          </a>
          <a className="footer__link" href="https://t.me/tsarkagmshrk" target='_blank'>
            <ion-icon name='paper-plane'></ion-icon>
          </a>
        </div>
      </div> */}

      {/* <div className='footer__rights'>
        <h2 className='footer__title'>Права</h2>
        <p className='footer__description'>
          Весь материал на сайте предназначен исключительно для бесплатного домашнего ознакомительного просмотра.
        </p>
      </div> */}
    </footer>
  );
};

export default Footer;
