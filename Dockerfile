FROM ubuntu:latest
LABEL authors="pionero"

ENTRYPOINT ["top", "-b"]