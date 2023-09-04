import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__contacts'>
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
    </footer>
  )
}

export default Footer;