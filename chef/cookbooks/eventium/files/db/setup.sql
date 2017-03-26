CREATE SCHEMA website;

/*

CREATE TABLE website.users (
	id SERIAL PRIMARY KEY,
	email varchar(1000),
	password varchar(100),
	first_name varchar(100),
	last_name varchar(100),
	description varchar(1000),
	avatar varchar(250)
);

CREATE TABLE website.events (
	id SERIAL PRIMARY KEY,
	title varchar(250),
	address varchar(250),
	city varchar(100),
	postal_code varchar(10),
	description varchar(2000),
	image varchar(250),
	start_time time without time zone,
	end_time time without time zone
);

CREATE TABLE website.members (
	id SERIAL PRIMARY KEY,
	event_id integer REFERENCES events (id),
	user_id integer REFERENCES users (id),
	role varchar(50)
);

CREATE TABLE website.invites (
	id SERIAL PRIMARY KEY,
	event_id integer REFERENCES events (id),
	guest_id integer REFERENCES users (id),
	host_id integer REFERENCES users (id),
	created_on time without time zone,
	message varchar(500)
);

CREATE TABLE website.messages (
	id SERIAL PRIMARY KEY,
	event_id integer REFERENCES events (id),
	user_id integer REFERENCES users (id),
	created_on time without time zone,
	content varchar(2000)
);

*/

CREATE ROLE app 
	PASSWORD '@ppl1c@t10n';

GRANT CONNECT CREATE TEMP TABLE 
	ON DATABASE eventium
	TO app;

GRANT ALL
	ON SCHEMA website
	TO app;

GRANT ALL
	ON ALL TABLES IN SCHEMA website
	TO app;