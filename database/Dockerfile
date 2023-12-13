FROM postgres:16 AS database

EXPOSE 5432:5432

ENV POSTGRES_USER=${POSTGRES_USER}

ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

ENV POSTGRES_DB=${POSTGRES_DB}

COPY ./uuid_install.sh /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=20s --timeout=30s --start-period=30s --retries=5 \
CMD ["CMD-SHELL", "pg_isready -d ${POSTGRES_DB} -U ${POSTGRES_USER}"]