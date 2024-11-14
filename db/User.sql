CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    typeAccount VARCHAR(20) CHECK (typeAccount IN ('perso', 'pro', 'fusion')) NOT NULL,
    account_status BOOLEAN DEFAULT TRUE,
    subscription_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
    updated_at TIMESTAMP DEFAULT NOW()
);
