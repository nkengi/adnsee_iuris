CREATE TABLE superUser (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    current_role VARCHAR(50) CHECK (current_role IN ('Admin', 'ContentManager', 'UserManager'))
);
