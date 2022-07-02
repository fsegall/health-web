import React, { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { colors } from "../../utils/colors/theme";
import AdminMenu from "./components/Menu";
import { StyledBurger } from "./components/Menu/styles";
import { getPageName } from "./components/Menu/menu-routes";

const AdminTemplate = ({
  children
}: {
  children?: React.ReactNode
}) => {
  const location = useLocation();

  const maxWidth700px = window.matchMedia('(max-width: 700px)')

  const [showOnMobile, setShowOnMobile] = React.useState<boolean>(false)
  const currentLocation = location?.pathname
  useEffect(() => {
    setShowOnMobile(false)
  }, [currentLocation])

  return (
    <>
      <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      {maxWidth700px?.matches && !showOnMobile ? null : (
        <div style={{ height: '100%', position: maxWidth700px?.matches ? 'absolute' : 'sticky', top: 0 }}>
          <AdminMenu isMobile={showOnMobile} />
        </div>
      )}
      <div style={{ width: '100%'}}>
        <div style={{
          position: 'sticky',
          overflow: 'auto',
          top: 0,
          zIndex: 10,
        }}>
          <div
            style={{
              backgroundColor: colors.gray,
              width: '100%',
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.15)',
              gap: '20px'
            }}
          >
            {maxWidth700px?.matches && (
              <span style={{ zIndex: 100 }}>
                <StyledBurger open={showOnMobile} onClick={() => setShowOnMobile(!showOnMobile)} ><div /><div /><div /></StyledBurger>
              </span>
            )}
            <span style={{ color: colors.secundary }}>Rede Pensan</span>
            {getPageName(location.pathname) && (
              <>
                <strong style={{ color: colors.orange }}>|</strong>
                <strong style={{ color: colors.secundary }}>{getPageName(location.pathname)}</strong>
              </>
            )}
          </div>
        </div>
        {children}
      </div>
      </div>
    </>

  )
}

export default AdminTemplate
