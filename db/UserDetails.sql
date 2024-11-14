CREATE TABLE userDetails (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    profile_picture VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    origin_place VARCHAR(100),
    address VARCHAR(255),
    phone VARCHAR(15),
    business_name VARCHAR(100),
    business_type VARCHAR(20) CHECK (business_type IN ('Siret', 'Siren', 'ESSN')),
    business_id_type VARCHAR(50),
    business_address VARCHAR(255),
    business_email VARCHAR(100)
);
