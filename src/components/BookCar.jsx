import { useState } from "react";

const WHATSAPP_NUMBER = "250787619387";

function BookCar() {
  const [formData, setFormData] = useState({
    pickupDate: "", pickupTime: "", returnDate: "", returnTime: "",
    pickupLocation: "", sameDropoff: true, dropoffLocation: "",
    carType: "", transmission: "", passengers: "", budget: "",
    purpose: "", name: "", email: "", phone: "", whatsapp: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!formData.pickupDate) e.pickupDate = true;
    if (!formData.pickupTime) e.pickupTime = true;
    if (!formData.returnDate) e.returnDate = true;
    if (!formData.pickupLocation) e.pickupLocation = true;
    if (!formData.name) e.name = true;
    if (!formData.phone) e.phone = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMsg = () => {
    const lines = [
      "🚗 *New Booking Request — Kigali Car Rental*", "",
      `📅 Pickup: ${formData.pickupDate} at ${formData.pickupTime}`,
      `📅 Return: ${formData.returnDate} at ${formData.returnTime}`,
      `📍 Pickup Location: ${formData.pickupLocation}`,
      !formData.sameDropoff && formData.dropoffLocation
        ? `📍 Drop-off: ${formData.dropoffLocation}` : "📍 Drop-off: Same as pickup", "",
      formData.carType ? `🚙 Car Type: ${formData.carType}` : null,
      formData.transmission ? `⚙️ Transmission: ${formData.transmission}` : null,
      formData.passengers ? `👥 Passengers: ${formData.passengers}` : null,
      formData.budget ? `💵 Budget: ${formData.budget}/day` : null,
      formData.purpose ? `🎯 Purpose: ${formData.purpose}` : null, "",
      `👤 Name: ${formData.name}`,
      `📞 Phone: ${formData.phone}`,
      formData.email ? `📧 Email: ${formData.email}` : null,
      formData.notes ? `📝 Notes: ${formData.notes}` : null,
    ].filter(Boolean).join("\n");
    return encodeURIComponent(lines);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg()}`, "_blank");
    }, 800);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ pickupDate:"",pickupTime:"",returnDate:"",returnTime:"",pickupLocation:"",sameDropoff:true,dropoffLocation:"",carType:"",transmission:"",passengers:"",budget:"",purpose:"",name:"",email:"",phone:"",whatsapp:"",notes:"" });
  };

  const KIGALI_LOCATIONS = [
    "Kigali International Airport (KGL)",
    "Kiyovu / City Centre",
    "Kimihurura",
    "Nyamirambo",
    "Gikondo",
    "Remera",
    "Kacyiru",
    "Gisozi",
    "Nyabugogo Bus Terminal",
    "Other (specify in notes)",
  ];

  return (
    <section id="booking-section" className="book-section">
      <div className="container">
        <div className="book-content">
          <div className="book-content__box booking-form-modern">
            <div className="booking-form-header">
              <h2>Book a Car</h2>
              <p>Fill in your trip details and we'll confirm within 2 hours via WhatsApp or email.</p>
            </div>

            {submitted ? (
              <div className="booking-success">
                <div className="booking-success__icon"><i className="fa-brands fa-whatsapp"></i></div>
                <h3>Request Sent!</h3>
                <p>Your booking request has been received. We're opening WhatsApp now — our team will confirm your vehicle within 2 hours.</p>
                <button className="booking-success__reset" onClick={resetForm}>Make Another Booking</button>
              </div>
            ) : (
              <form className="booking-form-grid" onSubmit={handleSubmit}>

                <div className="form-section-title">
                  <i className="fa-solid fa-calendar-days"></i> Trip Details
                </div>

                <div className="form-row-4">
                  <div className={`form-group ${errors.pickupDate ? "has-error" : ""}`}>
                    <label>Pickup Date <b>*</b></label>
                    <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handle} min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className={`form-group ${errors.pickupTime ? "has-error" : ""}`}>
                    <label>Pickup Time <b>*</b></label>
                    <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handle} />
                  </div>
                  <div className={`form-group ${errors.returnDate ? "has-error" : ""}`}>
                    <label>Return Date <b>*</b></label>
                    <input type="date" name="returnDate" value={formData.returnDate} onChange={handle} min={formData.pickupDate || new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="form-group">
                    <label>Return Time</label>
                    <input type="time" name="returnTime" value={formData.returnTime} onChange={handle} />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className={`form-group ${errors.pickupLocation ? "has-error" : ""}`}>
                    <label><i className="fa-solid fa-location-dot"></i> Pickup Location <b>*</b></label>
                    <select name="pickupLocation" value={formData.pickupLocation} onChange={handle}>
                      <option value="">Select pickup location</option>
                      {KIGALI_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label><i className="fa-solid fa-location-dot"></i> Drop-off Location</label>
                    <label className="same-location-check">
                      <input type="checkbox" name="sameDropoff" checked={formData.sameDropoff} onChange={handle} />
                      <span>Same as pickup</span>
                    </label>
                    {!formData.sameDropoff && (
                      <select name="dropoffLocation" value={formData.dropoffLocation} onChange={handle} style={{marginTop:"8px"}}>
                        <option value="">Select drop-off location</option>
                        {KIGALI_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    )}
                  </div>
                </div>

                <div className="form-section-title" style={{marginTop:"8px"}}>
                  <i className="fa-solid fa-car"></i> Your Preferences
                </div>

                <div className="form-row-4">
                  <div className="form-group">
                    <label>Car Type</label>
                    <select name="carType" value={formData.carType} onChange={handle}>
                      <option value="">Any type</option>
                      <option>Sedan</option><option>SUV</option><option>4x4</option>
                      <option>Minivan</option><option>Luxury</option><option>Economy</option><option>Coaster / Bus</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Transmission</label>
                    <select name="transmission" value={formData.transmission} onChange={handle}>
                      <option value="">No preference</option>
                      <option>Automatic</option><option>Manual</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Passengers</label>
                    <select name="passengers" value={formData.passengers} onChange={handle}>
                      <option value="">Select</option>
                      <option>1–2</option><option>3–4</option><option>5–6</option><option>7–8</option><option>9+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Daily Budget (USD)</label>
                    <select name="budget" value={formData.budget} onChange={handle}>
                      <option value="">Select budget</option>
                      <option>Under $50</option><option>$50 – $100</option>
                      <option>$100 – $150</option><option>$150 – $200</option><option>$200+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Purpose of Rental</label>
                  <select name="purpose" value={formData.purpose} onChange={handle}>
                    <option value="">Select purpose</option>
                    <option>Business Trip</option><option>Tourism / Sightseeing</option>
                    <option>Safari / Game Drive</option><option>Airport Transfer</option>
                    <option>Wedding / Event</option><option>Other</option>
                  </select>
                </div>

                <div className="form-section-title" style={{marginTop:"8px"}}>
                  <i className="fa-solid fa-user"></i> Contact Information
                </div>

                <div className="form-row-2">
                  <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                    <label>Full Name <b>*</b></label>
                    <input type="text" name="name" value={formData.name} onChange={handle} placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handle} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
                    <label>Phone Number <b>*</b></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handle} placeholder="+250 7XX XXX XXX" />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp <span className="optional-label">(if different)</span></label>
                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handle} placeholder="+250 7XX XXX XXX" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests or Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handle} placeholder="E.g. driver needed, infant seat, airport sign with name..." rows={3} />
                </div>

                {Object.keys(errors).length > 0 && (
                  <p className="form-error-msg">
                    <i className="fa-solid fa-circle-exclamation"></i> Please fill in all required fields marked with *
                  </p>
                )}

                <button type="submit" className="book-submit-btn">
                  <i className="fa-brands fa-whatsapp"></i> Submit Booking Request
                </button>

                <div className="booking-next-steps">
                  <h4>What happens next?</h4>
                  <ul>
                    <li><i className="fa-solid fa-circle-check"></i> We review your request within 2 hours</li>
                    <li><i className="fa-solid fa-circle-check"></i> We recommend the best vehicle for your needs</li>
                    <li><i className="fa-solid fa-circle-check"></i> You get a detailed quote via WhatsApp or email</li>
                    <li><i className="fa-solid fa-circle-check"></i> Confirm and your car is reserved!</li>
                  </ul>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookCar;
