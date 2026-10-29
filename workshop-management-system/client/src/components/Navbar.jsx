import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '15px 30px', 
      background: '#1a1a1a', 
      color: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <h2 style={{ margin: 0, color: '#646cff' }}>Workshop System</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {token ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            {role === 'admin' && (
              <Link to="/create-workshop" style={{ color: 'white', textDecoration: 'none' }}>Create Workshop</Link>
            )}
            <button 
              onClick={handleLogout} 
              style={{ padding: '8px 16px', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}