import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post('/api/form', formData);
      setMessage('Form data saved successfully'); 
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      console.error('Error saving form data:', error.message);
      setMessage('Error saving form data');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h1>Formify: Form Data Collector and Spreadsheet Integration</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <div>
          <label htmlFor="name"></label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message"></label>
          <br />
          <textarea
            id="message"
            name="message"
            placeholder='Message'
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
      {loading && <div className="loading">Saving...</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
