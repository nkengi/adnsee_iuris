// components/SubscriptionSettings.js
import { useState, useEffect } from 'react';

export default function SubscriptionSettings({ user }) {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const response = await fetch(`/api/subscription/status?user_id=${user.id}`);
      const data = await response.json();
      setSubscriptionStatus(data.status);
    };
    fetchSubscriptionStatus();
  }, [user.id]);

  const handleSubscriptionChange = async (newPlan) => {
    const response = await fetch('/api/subscription/change', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, newPlan }),
    });
    const data = await response.json();
    if (data.success) {
      alert('Votre souscription sera mise à jour après la période en cours.');
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h3>Souscriptions</h3>
      <p>Status : {subscriptionStatus ? 'Actif' : 'Inactif'}</p>
      <button onClick={() => handleSubscriptionChange('mensuel')}>Passer à Mensuel</button>
      <button onClick={() => handleSubscriptionChange('annuel')}>Passer à Annuel</button>
    </div>
  );
}
