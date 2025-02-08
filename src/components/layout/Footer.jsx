import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="pt-8 pb-5 bg-light text-primary">
        <ul className="list-unstyled d-lg-flex justify-content-lg-around">
          <li className="p-3 text-center">
            <NavLink to="/">
              <img
                style={{width: '75%'}}
                className="object-fit footer-link-hover"
                src="images/logo/logo.png"
                alt="logo"
              />
            </NavLink>
          </li>
          <li className="p-3">
            <p className="h5">聯絡我們</p>
            <p>
              電話 :
              <a href="tel:(02) 1234-5678" className="footer-link-hover">
                (02) 1234-5678
              </a>
              <br />
              E-mail :
              <a
                href="mailto:x5426854268@gmail.com"
                className="footer-link-hover"
              >
                x5426854268@gmail.com
              </a>
              <br />
              MON - FRI : 8:30 am - 17:30 pm
            </p>
            <ul className="list-unstyled d-flex">
              <li className="footer-link-hover">
                <a className="pe-3 link-primary" href="#">
                  <i className="h2 bi bi-facebook"></i>
                </a>
              </li>
              <li className="footer-link-hover">
                <a className="pe-3 link-primary" href="#">
                  <i className="h2 bi bi-instagram"></i>
                </a>
              </li>
              <li className="footer-link-hover">
                <a className="pe-3 link-primary" href="#">
                  <i className="h2 bi bi-envelope"></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="text-center mt-7">
          <p className="small text-secondary m-0">
            本網站僅供作品參考，並非商品真實營運販售，若有侵權請來信告知，將立即處理
          </p>
          <p className="small text-secondary m-0">
            Copyright ©Liaoyu All Rights Reserved. Designed by ahmomoz
          </p>
        </div>
      </footer>
    </>
  );
}
