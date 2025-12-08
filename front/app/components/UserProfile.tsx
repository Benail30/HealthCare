'use client'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../lib/hooks';
import { RootState } from '../lib/store';
import { fetchCurrentUser } from '../lib/CurrentUserSlice';
import styles from '../styles/UserProfile.module.css'

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state: RootState) => state.currentUser);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <h1>{user?.firstName || 'Guest'}</h1>
      <h2>{user?.lastName || 'Anonymous'}</h2>
      <h3>{user?.email || 'Anonymous'}</h3>
      <button className={styles.editButton}>Edit Profile</button>
      <div className={styles.rates}>146 Rates</div>
      <div className={styles.trust}>95% Trust</div>
    
    </div>
  );
};
export default UserProfile;