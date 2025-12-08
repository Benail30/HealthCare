'use client'
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks'
import Link from 'next/link';
// import { logout } from '../lib/authSlice';
import styles from '../styles/Navbar.module.css'

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.currentUser.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // dispatch(logout());
  };

  return (
    <div className={styles.divNavbar}>
      

      <div className={styles.navLinks}>
      <div className={styles.logoContainer}>
        <Link href="/">
          
            <img
              className={styles.logo}
              src="https://s3-alpha-sig.figma.com/img/efb1/3ff6/87f33e562a35e98a4b2866ad981588b7?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPzVoEbf5fGTXpQWfojiNqWXMObFFvp-jDa1CJ6LxfaEmffDK1VuxjROjvvmfjL~Vh5R~W29vufdEaJtGGX0QZgYq~SXm445Bsd9mwZ~HMssWd~pI5423RQKJQsdU3fNKkHNS94dTWhPoVGEOBc4xrZOcaR9MNw10N1V0eQ9lUixtr0305B23bXH8cLiNQCc1an1vQ2A2ocMKXAwruZ4TZ51ndkquo9defr9H6ZOEMoFt3Nz8XVJgr9T19A9MbbW7pim1vvzievveK0XzwASOIKCiSaxlGw8kpLX6lPR1tppcT0cU~F1gEeLscVnSRzUaD8kri6HNMw6wbDNcogvZw__"
              alt="Logo"
            />
        
        </Link>
        <Link className={styles.brand} href="/" passHref>
        
            health<span className={styles.greenText}>care</span>
         
        </Link>
      </div>
        <Link className={styles.navLink} href="/">
         HOME
        </Link>
        <Link className={styles.navLink} href="/Appointment">
         Service
        </Link>
        <Link className={styles.navLink} href="/contact">
         Contact Us
        </Link>
        <Link href="/Chat">
         <button className={styles.loginButton}>Chat</button>
        </Link>
        <Link className={styles.navLink} href="/Pharmacy">
          Pharmacy
        </Link>
        <Link className={styles.navLink} href="/doctorlist">
          Doctors
        </Link>
        <Link className={styles.navLink} href="/SignIn">
          Sign Up
        </Link>
        <Link href="/SignUp">
         <button className={styles.loginButton}>Log In</button>
        </Link>

        {!isLoggedIn ? (
          <div className={styles.dropdown}>
              <img
                className={styles.profileIcon} 
                // src="/path-to-profile-icon.png"
                alt="Profile"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link className={styles.navLink} href="/profile">
                 Profile
                </Link><br />
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        )
         : (
          <>
            <Link className={styles.navLink} href="/signup">
             Sign Up
            </Link>
            <Link href="/login">
              <button className={styles.loginButton}>Log In</button>
            </Link>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Navbar;
