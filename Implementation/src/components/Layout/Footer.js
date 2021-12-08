import './Footer.css';
// footer rendering, basic html design
const Footer = () => {
  return (
    <div>
      <footer id="dk-footer" className="dk-footer">
        <div className="container">
          <div className="row">

            <div className="col-md-12 col-lg-4">
              <div className="dk-footer-box-info">
                <a href="#">
                  <img src="https://cdn.pixabay.com/photo/2019/01/23/21/16/pixabay-3951079_960_720.png" alt="footer_logo" className="img-fluid footer-logo"  />
                </a>
                <div className="footer-social-link fbasdf">
                  <h3>Follow us</h3>
                  <ul>
                    <li>
                      <a href="#">
                      <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer-awarad">
                <img src="images/icon/best.png" alt="" />
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="contact-us">
                    <div className="contact-icon">
                      <i className="fa fa-map-o" aria-hidden="true"></i>
                    </div>
                    <div className="contact-info">
                      <h3>Al Reem Island</h3>
                      <p>2653 Road Avenue</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="contact-us contact-us-last">
                    <div className="contact-icon">
                      <i className="fa fa-volume-control-phone" aria-hidden="true"></i>
                    </div>
                    <div className="contact-info">
                      <h3>95 711 9 5353</h3>
                      <p>Give us a call</p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="footer-widget footer-left-widget">
                    <div className="section-heading">
                      <h3>Useful Links</h3>
                    </div>
                    <ul>
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Location</a>
                      </li>
                      <li>
                        <a href="#">Services</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="#">Feedback</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Faq</a>
                      </li>
                    </ul>
                  </div>

                </div>

                <div className="col-md-12 col-lg-6">
                  <div className="footer-widget">
                    <div className="section-heading">
                      <h3>Subscribe</h3>
                    </div>

                    <form action="#">
                      <div className="form-row">
                        <div className="col dk-footer-form">
                          <input type="email" className="form-control" placeholder="Email Address" />
                          <button type ="submit">
                          <i class ="fa fa-send"></i>
                          </button>
                        </div>
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <span>Copyright © 2021, All Right Reserved</span>
              </div>

              <div className="col-md-6">
                <div className="copyright-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

        </div>
 
      </footer>
    </div>
  );
};
export default Footer;