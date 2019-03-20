CREATE DATABASE recommendations;

USE recommendations;

CREATE TABLE category (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name ENUM (
    'animation',
    'comedy',
    'music',
    'education',
    'art',
    'design',
    'documentary',
    'food',
    'fashion',
    'travel',
    'journalism'
  ) UNIQUE
);

CREATE TABLE tag (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(80) UNIQUE
);

CREATE TABLE video (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(80),
  plays INTEGER,
  thumbnailIndex INTEGER,
  title VARCHAR(80),
  category_id INTEGER REFERENCES category(id)
);

CREATE TABLE video_tag (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  tag_id INTEGER REFERENCES tag(id),
  video_id INTEGER REFERENCES video(id)
);

-- mysql -u root < db-mysql/schema.sql
