import { useLocation, Navigate } from 'react-router-dom'

export function PublicRoute({ children }) {
    const authenticated=localStorage.getItem('isLoggedIn');
    let location = useLocation();

    if(authenticated) {
        return <Navigate to="/admin/Dashboard" state={{ from: location}} replace />
    }
    
 return children
}  