import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE = "https://carrentalinkigali.com/myimages";
const WHATSAPP_NUMBER = "250787619387";
const WHATSAPP_MSG = encodeURIComponent("Hi! I'd like to book a car with Kigali Car Rental. Please send me available options.");

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const bookBtn = () => document.querySelector("#booking-section").scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const onPageScroll = () => setGoUp(window.pageYOffset > 600);
    window.addEventListener("scroll", onPageScroll);
    return () => window.removeEventListener("scroll", onPageScroll);
  }, []);

  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <img className="bg-shape" src={`${BASE}/hero/hero-bg.png`} alt="bg-shape" />
          <div className="hero-content">
            <div className="hero-content__text">
              <h4>🇷🇼 Kigali's Trusted Car Rental</h4>
              <h1>Explore Rwanda <span>Your Way</span></h1>
              <p>From airport pickups to safari game drives and cross-country adventures — we have the perfect vehicle for every journey in Rwanda. Transparent pricing, no hidden fees.</p>
              <div className="hero-content__text__btns">
                <Link onClick={bookBtn} className="hero-content__text__btns__book-ride" to="/">
                  Book a Car &nbsp; <i className="fa-solid fa-circle-check"></i>
                </Link>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer" className="hero-content__text__btns__learn-more" style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <i className="fa-brands fa-whatsapp"></i> WhatsApp Us
                </a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><strong>500+</strong><span>Happy Clients</span></div>
                <div className="hero-stat"><strong>20+</strong><span>Vehicles</span></div>
                <div className="hero-stat"><strong>24/7</strong><span>Support</span></div>
              </div>
            </div>
            <img src={`${BASE}/hero/main-car.png`} alt="car-img" className="hero-content__car-img" />
          </div>
        </div>
        <div onClick={scrollToTop} className={`scroll-up ${goUp ? "show-scroll" : ""}`}>
          <i className="fa-solid fa-angle-up"></i>
        </div>
      </section>
    </>
  );
}

export default Hero;
