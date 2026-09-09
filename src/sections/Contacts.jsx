import { useState } from 'react'

function Contacts() {
  const [showPopup, setShowPopup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowPopup(true)
    e.target.reset()
  }

  const closePopup = () => setShowPopup(false)

  return (
    <section id="contacts" className="section contacts">
      <h2 className="contacts-title">Call or Visit</h2>
      <div className="contacts-grid">
        <div className="contacts-form-container">
          <h3 className="contacts-form-header">Send us a message!</h3>
          <p className="contacts-form-text">
            Have questions about any of our listings, or curious about what your
            home might be worth? Whether you're buying, selling, or just
            starting to explore your options, we'd love to hear from you. Send
            us a message and we'll get back to you as soon as we can.
          </p>
          <form className="contacts-form" onSubmit={handleSubmit}>
            <label className="contacts-form-field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label className="contacts-form-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
            </label>
            <label className="contacts-form-field">
              <span>Message</span>
              <textarea name="message" placeholder="Your message" rows={5} required />
            </label>
            <button type="submit" className="contacts-form-button">
              Send Message
            </button>
          </form>
        </div>
        <div className="contacts-right">
          <div className="contacts-info-container">
            <h3 className="contacts-info-header">Contact Information</h3>
            <p className="contacts-info-name">
              Marci Metzger - THE RIDGE REALTY GROUP
            </p>
            <p className="contacts-info-text">
              Address: 3190 HW-160, Suite F, Pahrump, Nevada 89048, United
              States
            </p>
            <p className="contacts-info-text">Phone: (206) 919-6886</p>
            <p className="contacts-info-text">
              Office Hours: 8:00 am - 7:00 pm, Daily
            </p>
            <p className="contacts-info-text">
              Appointments outside office hours available upon request. Just
              call!
            </p>
          </div>
          <div className="contacts-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4497.418560446718!2d-116.0276130241882!3d36.21450277241984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c637c1f4d7bcb3%3A0xa8d2ba43a3401d7!2sDesert%20View%20Hospital!5e1!3m2!1sen!2sph!4v1788938231669!5m2!1sen!2sph"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="The Ridge Realty Group location map"
            />
          </div>
        </div>
      </div>
      {showPopup && (
        <div
          className="contacts-popup-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closePopup}
        >
          <div
            className="contacts-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="contacts-popup-title">Message Sent!</p>
            <p className="contacts-popup-text">
              Thank you for reaching out. Your message has been sent
              successfully and we will answer it soon.
            </p>
            <button
              type="button"
              className="contacts-popup-button"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contacts
