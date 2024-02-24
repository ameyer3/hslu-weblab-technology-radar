 CREATE TABLE users
  (ID SERIAL PRIMARY KEY,
   username VARCHAR(50), 
   password VARCHAR(100),
    role VARCHAR(30));

CREATE TABLE technology 
(ID SERIAL PRIMARY KEY,
 name VARCHAR(30),
  category VARCHAR(20), 
  ring VARCHAR(20), 
  ringDescription VARCHAR(100), 
  description VARCHAR(100), 
  creationAuthor SMALLINT, 
  updateAuthor SMALLINT, 
  creationDate TIMESTAMP,
   published BOOLEAN, 
   publishingDate TIMESTAMP,
    CONSTRAINT fk_creationAuthor 
        FOREIGN KEY(creationAuthor) 
        REFERENCES users(id), 
    CONSTRAINT fk_updateAuthor 
        FOREIGN KEY(updateAuthor)
         REFERENCES users(id));

CREATE TABLE history 
(ID SERIAL PRIMARY KEY,
 technologyId SMALLINT, 
 name VARCHAR(30),
  category VARCHAR(20), 
  ring VARCHAR(20),
   ringdescription VARCHAR(100),
    description VARCHAR(100),  
    updateAuthor SMALLINT, 
    updateDate TIMESTAMP, 
    published BOOLEAN, 
    publishingDate TIMESTAMP, 
    CONSTRAINT fk_technologyId 
        FOREIGN KEY(technologyId) 
        REFERENCES technology(id), 
    CONSTRAINT fk_updateAuthor 
        FOREIGN KEY(updateAuthor) 
        REFERENCES users(id));


INSERT INTO users (username, password, role) VALUES ('test@tech.com', '$2a$10$wqj5nsRWX5MlpGYPoeQ4ruMtNtT2zAfsoLhFj8ImWHCWNXL1ZQUhC', 'CTO');
INSERT INTO users (username, password, role) VALUES ('normal@tech.com', '$2a$10$wqj5nsRWX5MlpGYPoeQ4ruMtNtT2zAfsoLhFj8ImWHCWNXL1ZQUhC', 'user');
INSERT INTO users (username, password, role) VALUES ('tech-lead@tech.com', '$2a$10$wqj5nsRWX5MlpGYPoeQ4ruMtNtT2zAfsoLhFj8ImWHCWNXL1ZQUhC', 'Tech Lead');
