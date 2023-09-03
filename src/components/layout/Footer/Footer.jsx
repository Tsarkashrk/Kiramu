import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__contacts'>
        <a href="https://github.com/Tsarkashrk" className="footer__link">
          <ion-icon name='logo-github'></ion-icon>
        </a>
        <a href="https://www.linkedin.com/in/tsarka/" className="footer__link">
          <ion-icon name='logo-linkedin'></ion-icon>
        </a>
        <a href="https://www.instagram.com/tsarka.shrk/" className="footer__link">
          <ion-icon name='logo-instagram'></ion-icon>
        </a>
        <a href="https://t.me/tsarkagmshrk" className="footer__link">
          <ion-icon name='paper-plane'></ion-icon>
        </a>
      </div>
    </footer>
  )
}

export default Footer;