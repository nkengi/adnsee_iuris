CREATE TABLE subscription (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    subscription_type VARCHAR(20) CHECK (subscription_type IN ('perso', 'pro', 'fusion')),
    billing_period VARCHAR(20) CHECK (billing_period IN ('mensuel', 'annuel')),
    status BOOLEAN DEFAULT FALSE,
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP
);
