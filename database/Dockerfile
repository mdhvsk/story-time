FROM mysql:latest


RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD

COPY dummy.sql /docker-entrypoint-initdb.d/data.sql

RUN echo $MYSQL_DATABASE



# RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /docker-entrypoint-initdb.d/dummy.sql
# RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306