CREATE TABLE user_quiz_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INT NOT NULL REFERENCES quiz(id) ON DELETE CASCADE,
    current_question INT DEFAULT 1,  -- Tracks the current question the user is on
    score INT DEFAULT 0,  -- Tracks the user's score
    completed BOOLEAN DEFAULT FALSE,  -- Marks if the quiz is completed
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Tracks last progress update
    UNIQUE (user_id, quiz_id)  -- Ensures one entry per user-quiz combination
);
