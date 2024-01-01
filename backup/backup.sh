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

# Datas
DIA=`date +%d`
MES=`date +%m`
ANO=`date +%Y`
HORA=`date +%T`
DATA_ATUAL=`date +%Y-%m-%d-%H-%M`

# Data de Inicio do Backup
DATA_INICIO=`date +%d/%m/%Y-%H:%M:%S`

# Caminho do arquivo de log
LOG_DIR=/home/hildembergol/SmartDeveloper/smart-os/backup/log
LOG=$LOG_DIR/backup_db_$ANO$MES$DIA.log

# Diretorio onde serão salvos os backups
DIR_BK=/home/hildembergol/SmartDeveloper/smart-os/backup/db

# Lista dos bancos de dados que serão realizados o backup
DATABASES=(SmartOs)

# Verifica se existe o diretorio para armazenar os logs
if [ ! -d $LOG_DIR ]; then
    mkdir $LOG_DIR
fi

# Verifica se existe o diretorio para o backup
if [ ! -d $DIR_BK ]; then
    mkdir -p $DIR_BK
fi

# Inicio do backup
echo "MYSQLDUMP Iniciado em $DATA_INICIO" >> $LOG

# Loop para backupear todos os bancos
for db in "${DATABASES[@]}"; do
    # Mysql DUMP
    # Para backupear procedures e functions foi adicionado o --routines
    mysqldump --routines -u$USER -p$PASS $db > $DIR_BK/$db'_'$DATA_ATUAL.sql

    echo "Realizando backup do banco ...............[ $db ]" >> $LOG

    # Compacta o arquivo sql em BZ2
    bzip2 $DIR_BK/$db'_'$DATA_ATUAL.sql
done

DATA_FINAL=`date +%d/%m/%Y-%H:%M:%S`
echo "MYSQLDUMP Finalizado em $DATA_FINAL" >> $LOG

# Remove arquivos de backups antigos - 5 dias
find $DIR_BK -type f -mtime +5 -exec rm -rf {} \;
