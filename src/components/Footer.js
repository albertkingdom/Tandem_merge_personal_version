import React from 'react'
import logotitle from '../logotitle.png'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillMail,
  AiFillYoutube,
} from 'react-icons/ai'
import { Container, NavLink } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <footer className="footer">
        <Container>
          <div className="justify-content-center titlesize">
            <img src={logotitle} alt="Logo" />
          </div>
          <div>
            <div className="footer_row">
              <ul className="footer_nav">
                <li>
                  <NavLink href="#">關於TANDEM</NavLink>
                </li>
                <li>
                  <NavLink href="#">TANDEM服務規範</NavLink>
                </li>
                <li>
                  <NavLink href="#">隱私權政策</NavLink>
                </li>
                <li>
                  <NavLink href="#">人才招募</NavLink>
                </li>
                <li>
                  <NavLink href="#">聯絡我們</NavLink>
                </li>
              </ul>
            </div>
            <div className="footer_row">
              <ul className="footer_icon">
                <li>
                  <NavLink>
                    <AiFillFacebook />
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <AiFillInstagram />
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <AiFillTwitterCircle />
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <AiFillMail />
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <AiFillYoutube />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <p className="footer_copyright">
            <small>
              Copyright <span lang="en">©</span> TANDEM, Inc.
            </small>
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Footer
