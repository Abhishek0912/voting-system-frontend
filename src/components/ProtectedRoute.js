import * as React from "react";
import {Navigate, useLocation} from "react-router-dom"

    
export function ProtectedRoute({ children }) {
    const authenticated=localStorage.getItem('isLoggedIn');
    let location = useLocation();

    if(!authenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    
 return children
}  