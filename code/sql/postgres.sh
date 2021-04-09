# Login
psql -U root

\q # Quit/Exit
\l # List databases
\c <database> # connect to database
\d <table> # Describe table definition including triggers
describe <table>;
\dt *.* # List tables from all schemas (if *.* is omitted will only show SEARCH_PATH ones)
\du # Show users
create database <database>; # create new db
\x auto # pretty print
