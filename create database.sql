-- host: 192.168.1.92 

create database monolithic CHARACTER SET utf8;

create user 'micro'@'%' identified by 'servicE0412';

grant all privileges on monolithic.* to 'micro'@'%';

flush privileges;