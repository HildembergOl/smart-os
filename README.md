This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Icons:

- Stroke Width: 1.5
- Size: 48px
- [`Lucide Icons`](https://lucide.dev/icons/download)

## Palete Colors:

https://coolors.co/ffe74c-2c4251-d16666-c5d1eb-92afd7

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Backup

- git config alias.add ./backup/backup.sh && git add -A
- Directory: @/backup
- New file:
  - backup.sh
- Command Line:

```bash
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
LOG_DIR=/home/hildembergol/SmartDeveloper/backup/log
LOG=$LOG_DIR/backup_db_$ANO$MES$DIA.log

# Diretorio onde serão salvos os backups
DIR_BK=/home/hildembergol/SmartDeveloper/backup/db

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

```
