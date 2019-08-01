CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username TEXT, 
	password TEXT, 
	user_name TEXT,
	user_photo TEXT
);

CREATE TABLE IF NOT EXISTS books (
	id SERIAL PRIMARY KEY,
	book_title TEXT,
	book_author TEXT,
	book_synopsis TEXT,
	book_image  TEXT,
	user_id INT
);

CREATE TABLE IF NOT EXISTS book_ownerhistory (
	id SERIAL PRIMARY KEY,
	user_id INT,
	book_id INT,
	start_owned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
	id SERIAL PRIMARY KEY,
	book_rental_id INT,
	message TEXT,
	user_id
);

CREATE TABLE IF NOT EXISTS userreviews (
	id SERIAL PRIMARY KEY,
	user_id INT,
	reviewer_id INT,
	user_review TEXT
);

CREATE TABLE IF NOT EXISTS bookreviews (
	id SERIAL PRIMARY KEY,
	user_id INT,
	book_id INT,
	book_review TEXT,
	review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

