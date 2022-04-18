-- MySQL Script generated by MySQL Workbench
-- Sun 17 Apr 2022 06:55:50 PM CST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema maya_academy
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `maya_academy` ;

-- -----------------------------------------------------
-- Schema maya_academy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `maya_academy` ;
USE `maya_academy` ;

-- -----------------------------------------------------
-- Table `maya_academy`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  `user_type` TINYINT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `gender` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NULL,
  `phone_number` VARCHAR(20) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`lesson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`lesson` (
  `lesson_id` INT NOT NULL AUTO_INCREMENT,
  `lesson_name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`lesson_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`activity` (
  `activity_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `lesson_id` INT NOT NULL,
  `activity_type` ENUM('ARTICLE', 'FORM') NOT NULL,
  PRIMARY KEY (`activity_id`),
  INDEX `fk_Activity_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Activity_Lesson1_idx` (`lesson_id` ASC) VISIBLE,
  CONSTRAINT `fk_Activity_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `maya_academy`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Activity_Lesson1`
    FOREIGN KEY (`lesson_id`)
    REFERENCES `maya_academy`.`lesson` (`lesson_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`article` (
  `article_id` INT NOT NULL AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `article_name` VARCHAR(45) NOT NULL,
  `article_text` LONGBLOB NOT NULL,
  `creation_date` DATE NOT NULL,
  `modification_date` DATE NULL,
  PRIMARY KEY (`article_id`),
  INDEX `fk_Article_Activity1_idx` (`activity_id` ASC) VISIBLE,
  CONSTRAINT `fk_Article_Activity1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `maya_academy`.`activity` (`activity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`form`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`form` (
  `form_id` INT NOT NULL AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `form_name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `creation_date` DATE NOT NULL,
  `minimum_corrects` INT NOT NULL,
  `total` INT NOT NULL,
  PRIMARY KEY (`form_id`),
  INDEX `fk_Form_Activity1_idx` (`activity_id` ASC) VISIBLE,
  CONSTRAINT `fk_Form_Activity1`
    FOREIGN KEY (`activity_id`)
    REFERENCES `maya_academy`.`activity` (`activity_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`question` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `form_id` INT NOT NULL,
  `question_title` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(150) NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `fk_Question_Form1_idx` (`form_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Form1`
    FOREIGN KEY (`form_id`)
    REFERENCES `maya_academy`.`form` (`form_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`option` (
  `option_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `option_title` VARCHAR(60) NOT NULL,
  `correct` TINYINT NOT NULL,
  PRIMARY KEY (`option_id`),
  INDEX `fk_Option_Question1_idx` (`question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Question1`
    FOREIGN KEY (`question_id`)
    REFERENCES `maya_academy`.`question` (`question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `maya_academy`.`progress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `maya_academy`.`progress` (
  `progress_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `form_id` INT NOT NULL,
  `score` INT NOT NULL,
  `complete` TINYINT NOT NULL,
  PRIMARY KEY (`progress_id`),
  INDEX `fk_Progress_User1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Progress_Form1_idx` (`form_id` ASC) VISIBLE,
  CONSTRAINT `fk_Progress_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `maya_academy`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Progress_Form1`
    FOREIGN KEY (`form_id`)
    REFERENCES `maya_academy`.`form` (`form_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
