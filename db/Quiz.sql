CREATE TABLE quiz (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  theme JSON NOT NULL,
  accessType VARCHAR(10) CHECK (accessType IN ('freemium', 'premium')),
  accountTypes JSON NOT NULL,
  status VARCHAR(10) CHECK (status IN ('en cours', 'fini','publie')),
  questions JSON NOT NULL,
  createdBy INT REFERENCES users(id)
  updatedBy INT REFERENCES users(id)
);
