#!/usr/bin/env bash

set -eu

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE express_starter;
  CREATE DATABASE express_starter_test;
EOSQL
