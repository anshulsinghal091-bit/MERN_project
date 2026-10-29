import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await api.get('/workshops');
        setWorkshops(res.data);
      } catch (err) {
        console.error('Failed to fetch workshops:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const enroll = async (id) => {
    try {
      await api.put(`/workshops/${id}/enroll`);
      alert('Successfully enrolled in workshop!');
      // Refresh list
      const res = await api.get('/workshops');
      setWorkshops(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || 'Enrollment failed.');
    }
  };

  if (loading) return <h3>Loading available workshops...</h3>;

  return (
    <div>
      <h2>Available Workshops & Seminars</h2>
      {workshops.length === 0 ? (
        <p>No workshops scheduled yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {workshops.map(ws => (
            <div key={ws._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: 0 }}>{ws.title}</h3>
              <p>{ws.description}</p>
              <p><strong>Date:</strong> {new Date(ws.date).toLocaleDateString()}</p>
              <p><strong>Capacity:</strong> {ws.attendees?.length || 0} / {ws.capacity}</p>
              <button 
                onClick={() => enroll(ws._id)} 
                style={{ padding: '8px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}