import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [comment, setComment] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !comment || !time || !location) {
        toast.error('Please fill out all fields.', { position: 'top-right' });
    } else if (!isValidEmail(email)) {
        toast.warning('Please provide a valid email address.', { position: 'top-right' });
    } else {
        // If the form is successfully submitted, show a success toast
        toast.success('Form submitted successfully!', { position: 'top-right' });
        setName('');
        setEmail('');
        setPhoneNumber('');
        setComment('');
        setTime('');
        setLocation('');
        setDate('');
    }
    };

const isValidEmail = (email: string) => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="right-input-icon">
              <i className="icofont-ui-user"></i>
            </span>
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
              type="email"
              className="form-control"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="right-input-icon">
              <i className="icofont-email"></i>
            </span>
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
                type="text"
                className="form-control"
                placeholder="Your Phone *"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <span className="right-input-icon">
              <i className="icofont-phone"></i>
            </span>
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
                type="text"
                className="form-control"
                placeholder="Your Time *"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <span className="right-input-icon">
              <i className="icofont-clock-time"></i>
            </span>
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 mb-30">
          <div className="input-group flex-nowrap">
            <input
              type="text"
              className="form-control"
              placeholder="Your Location *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-12 mb-15">
          <textarea
            name="message"
            className="form-control"
            placeholder="Comment *"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="submit-button-sec">
        <button type="submit" className="custom-btn">
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
