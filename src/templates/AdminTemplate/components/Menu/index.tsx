import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import { colors } from '../../../../utils/colors/theme';
import logo from '../../../../assets/logo.png';
import emptyAvatar from '../../../../assets/default-user-logo.png';
import { menuRoutes } from './menu-routes';
import { FiPower } from 'react-icons/fi';

const AdminMenu = ({
  isMobile = false
}: {
  isMobile?: boolean
}) => {
  const { signOut, user } = useAuth();
  const location = useLocation();
  return (
    <header
    style={{
      display: 'flex',
      height: '100%',
      minHeight: '100vh',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: colors.secundary,
      padding: '30px',
      minWidth: '200px',
      width: isMobile ? '100vw' : '100%',
      boxShadow: '3px 0px 9px 0px rgba(0, 0, 0, 0.1)',
      zIndex: 20,
      paddingTop: isMobile ? '80px' : '30px',
      position: isMobile ? 'fixed' : 'static',
    }}
  >
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <img src={logo} style={{ maxWidth: '60px' }} alt="Safety" />
      <p style={{ color: colors.primary, fontWeight: 700, fontSize: '20px' }}>Rede Pensan</p>
    </div>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
      {menuRoutes(user?.role)?.map(o => (
        <Link key={o.path} to={o.path} style={{ textDecoration: 'none' }}>
          <p style={{ fontWeight: 500, color: location.pathname === o.path ? colors.primary : colors.white }}>{o.name}</p>
        </Link>
      ))}
    </nav>
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <img
          src={user?.avatar_url || emptyAvatar}
          alt={user?.name}
          style={{ maxWidth: '60px', borderRadius: '50%', border: `3px solid ${colors.primary}`, padding: '1px' }}
        />
      <p style={{ fontWeight: 400, color: colors.primary, fontSize: '14px', marginTop: '5px' }}>{user?.name}</p>
      <button
        type="button"
        onClick={signOut}
        style={{ border: 'none', backgroundColor: 'transparent', color: colors.primary, marginTop: '20px', display: 'flex', gap: '5px' }}
      >
        <FiPower />
        Sair
      </button>
    </div>
  </header>
  )
}

export default AdminMenu
