import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const openNav = () => setNav(!nav);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const WHATSAPP_NUMBER = "250787619387";
  const WHATSAPP_MSG = encodeURIComponent(
    "Hi! I'd like to book a car with Kigali Car Rental. Please send me available options."
  );

  return (
    <>
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar__close">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <ul className="mobile-navbar__links">
          <li><Link onClick={openNav} to="/">Home</Link></li>
          <li><Link onClick={openNav} to="/about">About</Link></li>
          <li><Link onClick={openNav} to="/models">Fleet</Link></li>
          <li><Link onClick={openNav} to="/testimonials">Testimonials</Link></li>
          <li><Link onClick={openNav} to="/team">Our Team</Link></li>
          <li><Link onClick={openNav} to="/contact">Contact</Link></li>
          <li style={{ marginTop: "16px" }}>
            
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="mobile-book-btn"
              onClick={openNav}
            >
              <i className="fa-brands fa-whatsapp"></i> Book on WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <span className="navbar__logo-text">
                <span className="logo-kigali">KIGALI</span>
                <span className="logo-car"> CAR RENTAL</span>
              </span>
            </Link>
          </div>

          <ul className="navbar__links">
            <li><Link className="home-link" to="/">Home</Link></li>
            <li><Link className="about-link" to="/about">About</Link></li>
            <li><Link className="models-link" to="/models">Fleet</Link></li>
            <li><Link className="testi-link" to="/testimonials">Testimonials</Link></li>
            <li><Link className="team-link" to="/team">Our Team</Link></li>
            <li><Link className="contact-link" to="/contact">Contact</Link></li>
          </ul>

          <div className="navbar__buttons">
            <a href="tel:+250787619387" className="navbar__buttons__call">
              <i className="fa-solid fa-phone"></i> Call Us
            </a>
            
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noreferrer"
              className="navbar__buttons__book"
            >
              <i className="fa-brands fa-whatsapp"></i> Book Now
            </a>
          </div>

          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>

      
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span className="whatsapp-float__tooltip">Chat with us!</span>
      </a>
    </>
  );
}

export default Navbar;
