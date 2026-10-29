import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function CreateWorkshop() {
  const [formData, setFormData] = useState({ title: '', description: '', date: '', capacity: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workshops', formData);
      alert('Workshop created successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to create workshop.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Create New Workshop</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input 
            type="text" 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea 
            required 
            rows="4"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
          <input 
            type="date" 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Capacity</label>
          <input 
            type="number" 
            required 
            min="1"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} 
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Create Workshop
        </button>
      </form>
    </div>
  );
}