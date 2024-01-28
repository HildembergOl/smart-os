#!/bin/bash
#
# Autor: Aristides Neto
# Email: falecom@aristides.dev
#
# Data: 09/06/2019
#
# Realiza o backup de bancos de dados MySQL
#

# Define usuario e senha do banco
USER='root'
PASS='Berg@134020'

# Diretorio onde serão salvos os backups
DIR_BK=/home/hildembergol/SmartDeveloper/smart-os/backup/db
DIR_BK_WINDOWS=C:\\SmartDeveloper\\smart-os\\backup\\db

# Nome do arquivo de Banco de Dados
arquivo_de_backup_realizado=SmartOs_2023-12-31-21-06

# Lista dos bancos de dados que serão realizados o backup
DATABASES=(SmartOs)

# Inicio do backup
echo "MYSQLDUMP Iniciado em $DATA_INICIO"

    # recupera o arquivo de banco de dados
    mysql -u$USER -p$PASS $db < $DIR_BK_WINDOWS/$arquivo_de_backup_realizado.sql

    echo "Realizando backup do banco ...............[ $db ]"

DATA_FINAL=`date +%d/%m/%Y-%H:%M:%S`
echo "MYSQLDUMP Finalizado em $DATA_FINAL"
