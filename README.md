[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



# Maeve
Welcome to the Maeve repository. In here you will find everything about the framework: its purpose, it's stack, main features, tech stack, how to use yourself and more!




## Latest Release

### Version 1.0.0

[Release Date: February 10, 2024]

#### Changelog

- First release of the project. 
- The system allows the user to generate datasets from usability logs retrieved from the Datadog monitoring tool

#### Contributors

- Pelicer
## Table of Contents

- [Introduction](#introduction)
- [Summary](#summary)
- [Stack](#stack)
- [Architecture](#architecture)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
- [Endpoint documentation](#endpoint-documentation)
- [Next steps](#next-steps)
- [License](#license)
## Introduction
Maeve is an ETL framework for dataset generation, specifically dataset generation in the context of platform agnostic applications, e.g. mobile, web or desktop, through communication with monitoring tools, such as Datadog, Grafana, etc.
## Summary

Maeve is the product of a Master's Degree thesis with the same title from the Instituto de Computação of the UNICAMP university. The thesis is about how, in a digital marketing context, the author can contribute to the generation of datasets.

Systems can be deployed everywhere: web, mobile, desktop, wearables, etc. Generating datasets (that in the context of digital marketing are basically usability logs), relies on building such applications that logs user interactivity. 

Given the complexity of doing such for each platform, and the extensive work that marketing or data science professionals might have on generating datasets from such systems, Maeve is a framework designed to generated digital marketing datasets from any system.

Maeve's premise is that, instead of making applications log that which is useful for datasets generation, we can abstract that log generation to market experts without reinventing the wheel. That means connecting applications to state of the start monitoring systems, such as Datadog or Grafana. Then, on an API based communication, Maeve is able to import logs from those systems, normalize them in a configured manner, and then generate text based datasets.
## Stack

- Java 17 + Spring boot for development of the microservices
- MongoDB as the datasource
- React 17 for the web application used for the proof of concept
- Cypress to create test cases that simulates human interaction
- Datadog as the chosen monitoring tool to provide logs from applications
- RabbitMQ as message broker for communication between the services
## Architecture

Maeve is a three module framework, that imports logs, normalizes them and then generates text-based datasets on CSV format. The three modules are: the importer, the normalizer and the generator.

### Importer

The importer is the first Java microservice of the framework. It is a CRON job based service that does the following routines:

- Get's the last job execution, looking for the timestamp
- Runs a CRON based job a that gets logs from the time range of the last execution until the current date time
- Saves the logs, raw, into a DocumentDB database
- Post a message per log to RabbitMQ, specifying the ID of the log entry
- Saves the job execution and timestamp

This accomplishes a few things: first, we remove the logs from the monitoring tools. Many of them have a defined time in which the logs will be available. With the importer, logs will not be lost. 

Secondly, we have the logs in a JSON format saved in NoSQL database. Since the logs might be different depending on the system being monitored, it is essential to use a NoSQL database. Specifically, a DocumentDB.

Lastly, by posting a message per log saved, we accomplish real-time normalization of the logs, which can be scalled. This makes Maeve an appropriate system for large systems and heavy payloads and availability necessities.

### Normalizer

As the names suggests, this module is responsible for normalizing raw logs. They come from a monitoring application as they send it. This means that there can be lots of useless data, things that we need to cross-reference before it makes sense, data that will only be useful after some transformation, etc. This is where the normalizer makes its magic.

This module is configured, meaning that we need to tell it what we need, what is useful, what needs to be transformed by which transformation methods, etc.

The normalizer performs the current routines:

- Consumes the message posted by the importer
- Gets the log entry from the database
- Extract the fields that the system is configured to extract
- Executes the transformation rules for each of the extract fields
- Saves in the DocumentDB a new log entry, the normalized log

With this, we successfully recorded the user's interactivity actions through the monitoring system, imported the raw data into our own ecossystem and made sense out of that information. We are ready to generate some datasets.

### Generator

This is the simplest module of the ecossystem. It is responsbile for getting the normalized logs and transforming those JSON's into a dataset. What that dataset looks like is a text based CSV file. The routines perofrmed by the generator are:

- Get the logs from a given time range
- Extract the headers from the logs retrieved from the database
- Write and save a CSV file containing all of the normalized data

It's done! You have datasets created based on your user's interactivity with your graphical interface, where you sell your product, and can begin asking questions that these datasets will help you answer.
## Getting started

Maeve has three Java modules, an UI and usability bots. To get started, you will need:

- Java SDK 17 installed in your machine
- Node 20+ installed with NPM
- Docker installed locally

With this, you can build all three Java modules, install the dependencies of the UI and bots. With docker, you can install a local instance of the framework's dependencies: RabbitMQ and MongoDB. After having the list above good to go, you can follow these steps to have the solution ready locally:

- Sync the maven pom files of all three Java projects
- Run npm install on the UI and usability bots
- Run a docker compose up command on the docker compose file found in the repo

With these steps, the solution should be good to go in your local machine.
## How to use

Maeve's built to allow users to choose which monitoring system they will use. However, it is still pretty much hardcoded into Datadog. For the time being, having a Datadog account set up, with an APP and API key is required. After setting up Datadog, this is what you need to do in order to generate your first datasets:

### Set up your host

Maeve is built upon logs from graphical interfaces. This means that you have to set up your mobile application, website or desktop application to communicate with Datadog. You can see how to accomplish that to your specific system on the [oficial website documentation](https://docs.datadoghq.com/account_management/api-app-keys/). 

However, this repository provides you with a simple UI already set up to communicate with Datadog. You can simply change the provided UI configured with your own APP and API Datadog keys.

## Set up your RabbitMQ broker and MongoDB instances

This repository has a docker-compose file that will generated for you a RabbitMQ broker and MongoDB instances. Simply run that scrip with your docker installation, and everything should be ready to go. The docker-compose file will create the broker and DB with credentials that are already configured in the importer, normalizer and generator.

### Importing and normalizing

Importing is a no-brainer. Simply replace in the importer's application properties the APP and API key with your own. Once that is done, you can run the application and it will begin importing automatically. If you want to change the periodicity by which the system imports logs, you can do that on the application properties CRON.

Normalzing is the most important bit of the framework. In the application properties, you need to choose which of the fields saved in the database by the importer you want to use. Simply change that configuration to extract the fields that are important to you.

### Generating datasets

Really, nothing much to be done here! The dataset generator is configured to save new datasets to the resources/dataset folder of the generator Java project folder. Each dataset file name will be an unique UUID.

## Endpoint Documentation

Both the normalizer and generator have endpoints. The normalizer one is optional, since it is an endpoint to normalize a given log, and it does that automatically by consuming RabbitMQ messages. Generating datasets, however, is only possible by hitting the dataset generator endpoint. Documentation for those endpoints are below, and both the systems have Swagger installed in them, so you can also locally set up the application and take a look into the Swagger UI.

| Application | Endpoint               | Description                                           | Example Request                                                        | Return Status |
|-------------|------------------------|-------------------------------------------------------|------------------------------------------------------------------------|---------------|
| Normalizer  | /normalize/{id}        | Normalizes the given log                              | ```POST /normalize/1```                                               | 201 CREATED   |
| Generator   | /dataset/generation    | Creates a dataset with the logs found for the given time range | ```POST /dataset/generation``` ```{ "from": "1970-01-01T00:00", "to": "2024-12-31T00:00" }``` | 201 CREATED   |


## Next steps

- Maeve's first monitoring tool, used in the proof of concept, was Datadog. For this reason, the system is pretty much hard-coded to use that provider. This will be changed in newer versions, by providing interfaces of which Datadog will only be a possible implementation, allowing you to create your own implementation for the monitoring tool of your choosing. Datadog will, however, always be the default example implementation of this repository
- The normalizer is right now, essentialy, an extractor. It does not have implemenations of methods capable of transforming/changing/formatting fields. It simply extracts the ones configured in its properties into a JSON format. In newer versions the normalizer will have an interface for normalization rules, a builder pattern and a few out-of-the box rules. With the interfaces, you will be free to create your own normalization rules.
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.
