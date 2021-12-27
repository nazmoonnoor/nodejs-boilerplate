CREATE TABLE domains (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  batch_id INT NOT NULL,
  name VARCHAR(50),
  domains TEXT[],
  created_at TIMESTAMP,
  request_status VARCHAR(15)
);


CREATE TABLE domain_results (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  batch_id INT NOT NULL,
  name VARCHAR(50),
  domain VARCHAR(100),
  status VARCHAR(15),
  site_response VARCHAR(10),
  score INTEGER,
  blacklisted BOOLEAN,
  created_at TIMESTAMP,
  valid_ssl BOOLEAN
);