## What is this project about?
This project is a usefull project which help to migrate graylog configuration from one version to another base on Grayloy API.

Here are the differents steps to migrate base on sequential diagram

TODO CHANGE IN ENGLIS
- creer le repertoire docker-compose
- créer le dns du server
- demarrer le docker-composer
- exécuter la fonctions suivante séquentiellement l'une peut dépendre de l'autre

- RUN SEQUENTIALLY IN ORDER TO AVOID ANY DEPENDENCY ERROR !!

- 1-	INDEX_SET TRANSFERT

- 2-	STREAMS TRANSFERT

- 3-	STREAMS RULES TRANSFERT

- 4-	INPUTS TRANSFERT

- 5-	NOTIFICATION TRANSFERT

- 6-	EVENTS DEFINITION TRANSFERT

- 7-  USER AND PERMISSIONS TRANSFERT


TODO : architecture



## What does the project do?
This project aims to automatically retrieve, parse and post data and configuration from one graylog to another using the graylog API.

## Why is it useful?
This project is useful to avoid mistakes with manual type and gain times.

## Which department is it for?
This project is use by the Integration Team


Log redirection configuration

![alt text](/docs/images/graylog_redirection.png)


