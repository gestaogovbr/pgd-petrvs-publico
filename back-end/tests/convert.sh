#!/bin/sh

if [ $# -lt 2 ]; then
  echo "Usage: $0 input_mysql.sql output_sqlite.sql"
  exit 1
fi

INPUT="$1"
OUTPUT="$2"

{
  sed -E '
    s/^  `situacao_funcional` enum.*,$/  "situacao_funcional" TEXT NOT NULL DEFAULT '\''ATIVO_PERMANENTE'\'',/g
    /^--/d

    s/^.*Status do documento: GERADO \(documento gerado\);.*,$/  "status" TEXT NOT NULL DEFAULT '\''GERADO'\'',/g

    # Remove MySQL table options
    s/ENGINE=[^ ]+//Ig
    s/DEFAULT CHARSET=[^ ]+//Ig
    s/CHARSET=[^ ]+//Ig
    s/COLLATE=[^ ]+//Ig

    # Remove AUTO_INCREMENT
    s/AUTO_INCREMENT=[0-9]+//Ig
    s/AUTO_INCREMENT//Ig

    # Remove UNSIGNED
    s/\bUNSIGNED\b//Ig

    # Backticks -> double quotes
    s/`([^`]*)`/\1/g

    # ENUM -> TEXT
    s/ENUM\([^)]+\)/TEXT/Ig

    # TINYINT(1) -> INTEGER
    s/TINYINT\s*\(\s*1\s*\)/INTEGER/Ig

    # Integer types
    s/\b(INT|INTEGER|BIGINT|SMALLINT|MEDIUMINT)\b(\s*\([0-9]+\))?/INTEGER/Ig

    # Floating types
    s/\b(DECIMAL|NUMERIC|FLOAT|DOUBLE)\b(\s*\([^)]+\))?/REAL/Ig

    # Date & time
    s/\b(DATETIME|TIMESTAMP)\b/TEXT/Ig

    # Remove ON UPDATE CURRENT_TIMESTAMP
    s/ON UPDATE CURRENT_TIMESTAMP//Ig

    # Remove inline KEY / INDEX definitions
    s/,[[:space:]]*(UNIQUE[[:space:]]+)?KEY[[:space:]]+"[^"]+"[[:space:]]*\([^)]+\)//Ig

    # Fix AUTOINCREMENT primary keys
    s/INTEGER[[:space:]]+NOT[[:space:]]+NULL[[:space:]]+PRIMARY[[:space:]]+KEY/INTEGER PRIMARY KEY AUTOINCREMENT/Ig



    # Separates the transactions by ;
    s/^\)[[:space:]]/)\;/g

    s/COMMENT '\''[^'\'']*'\''//g
    s/NOT NULL//Ig
    /^  KEY/d
    /^  UNIQUE/d
    /^  FULLTEXT/d
    s/_utf8mb4'\''\{[^}]*\}'\''/'\'''\''/g

    s/ char\([0-9]+\)/ TEXT/Ig
    s/DEFAULT json_array\(\)/DEFAULT '\'''\''/g
    s/ varchar\([0-9]+\)/ TEXT/Ig  
    s/ tinyint\([0-9]+\)/ INTEGER/Ig
    s/set\([^)]+\)/TEXT/Ig
    s/ longtext/ TEXT/Ig
    s/CHARACTER SET [^ ]+//Ig
    s/COLLATE [^ ]+//Ig
    s/current_timestamp\(\)/CURRENT_TIMESTAMP/g
    s/,[[:space:]]*KEY[[:space:]]+"[^"]+"[[:space:]]*\([^)]+\)//g
    s/CHECK \(json_valid[^)]*\)//g
    /CONSTRAINT/d
    # s/CHECK[[:space:]]*\([^)]*\)//g
    s/ \),$/,/g
    # Remove trailing commas before )
    s/,[[:space:]]*\)/\n)/g
    s/,\n\);/\n);/g
    s/PRIMARY KEY \(id\),/PRIMARY KEY \(id\)/g
    s/PRIMARY KEY \(id,tenant_id\),/PRIMARY KEY \(id,tenant_id\)/g
    # s/,\([[:space:]]*\);/\1;/'\''/g

  ' "$INPUT"
} > "$OUTPUT"

chmod 777 "$OUTPUT"
echo "Conversion complete. SQLite script written to $OUTPUT"