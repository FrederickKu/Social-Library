CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username TEXT, 
	password TEXT, 
	user_name TEXT,
	user_photo TEXT,
	user_gender TEXT,
	user_dob DATE
);

CREATE TABLE IF NOT EXISTS books (
	id SERIAL PRIMARY KEY,
	book_title TEXT,
	book_author TEXT,
	book_synopsis TEXT,
	owner_summary TEXT,
	book_image  TEXT,
	book_status TEXT
);

CREATE TABLE IF NOT EXISTS bookrentals (
	id SERIAL PRIMARY KEY,
	renter_id INT,
	book_id INT
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
	book_review TEXT
);

