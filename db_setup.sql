DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS costs;
DROP TABLE IF EXISTS patient_provider;
DROP TABLE IF EXISTS providers;
DROP TABLE IF EXISTS systems;
DROP TABLE IF EXISTS patients;


CREATE TABLE systems (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE patients (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
)ENGINE=InnoDB;

CREATE TABLE providers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    employer VARCHAR(255),
    system_id INT(11)
)ENGINE=InnoDB;

CREATE TABLE patient_provider (
    patient_id INT NOT NULL,
    provider_id INT NOT NULL,
    PRIMARY KEY (patient_id, provider_id),
    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients (id),
    CONSTRAINT fk_provider FOREIGN KEY (provider_id) REFERENCES providers (id)
)ENGINE=InnoDB;

CREATE TABLE costs (
    provider_id INT, 
    system_id INT, 
    cost int NOT NULL,
    PRIMARY KEY (provider_id, system_id), 
    FOREIGN KEY (provider_id) REFERENCES providers (id), 
    FOREIGN KEY (system_id) REFERENCES systems (id)
)ENGINE=InnoDB;

CREATE TABLE ratings (
    provider_id INT, 
    system_id INT, 
    rating int NOT NULL,
    PRIMARY KEY (provider_id, system_id), 
    FOREIGN KEY (provider_id) REFERENCES providers (id), 
    FOREIGN KEY (system_id) REFERENCES systems (id)
)ENGINE=InnoDB;