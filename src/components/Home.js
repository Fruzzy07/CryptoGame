import React from 'react';
import './Home.css';
import logoImage from '../images/Logo.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section
        data-bs-version="5.1"
        className="header1 coinm5 cid-tA5gUnL3Q8 mbr-fullscreen"
        id="header1-1"
      >
        <div className="container-fluid">
          <div className="row flex-row-reverse">
            <div className="blur-wrap_1"></div>
            <div className="blur-wrap_2"></div>
            <div className='fix_wrap'>
            <div className="col-12 col-lg-6">
              <div className="title-wrapper">
                <div className="desc-wrapper">
                  <p className="mbr-desc mbr-fonts-style display-4">
                    Virtual currency
                  </p>
                </div>
                <h1 className="mbr-section-title mbr-fonts-style display-1">
                  CryptoGame
                </h1>
                <p className="mbr-text mbr-fonts-style display-7">
                  "Crypto Game" is a project based on blockchain technology. The
                  goal of the project is to create a game in which
                  cryptocurrencies or tokens are used for user interaction,
                  transaction execution, creation of gaming assets or other
                  mechanics related to decentralized technologies.
                </p>
                <div className="mbr-section-btn">
                  <Link className="btn btn-primary display-4" to="/games">
                    Play now
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="image-wrapper">
                <img
                  src="../images/image15.jpg"
                  alt="Game Screenshot 3"
                />
              </div>
            </div>
          </div>

          </div>
        </div>
      </section>

      <section class="footer">
  <div class="footer-container">
    <div class="footer-title">
      <h2>CryptoGame</h2>
      <div className='name_course'>
      <p>Blockchain</p>
    </div>
    </div>
 
    <div class="footer-links">
      <ul>
        <li>KBTU</li>
        <li>Privacy Policy</li>
      </ul>
      <p class="footer-copyright">
        © Copyright 2024.<br />
        All Rights Reserved.
      </p>
    </div>
  </div>
</section>

    </>
  );
}

export default Home;