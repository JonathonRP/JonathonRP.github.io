# [Choice] Debian OS version: bullseye, buster
ARG VARIANT="jammy"
FROM --platform=amd64 mcr.microsoft.com/devcontainers/base:${VARIANT}
# FROM pandoc/ubuntu-latex:latest

# ENV DENO_INSTALL=/deno
# RUN mkdir -p /deno \
#     && curl -fsSL https://deno.land/x/install/install.sh | sh \
#     && chown -R vscode /deno

# ENV PATH=${DENO_INSTALL}/bin:${PATH} \
#     DENO_DIR=${DENO_INSTALL}/.cache/deno

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -q --no-allow-insecure-repositories \
    && apt-get install -y -o Acquire::Retries=10 --no-install-recommends \
     texlive \
     lmodern \
    && rm -rf /var/lib/apt/lists/*

RUN sudo apt update && sudo apt install weasyprint
RUN sudo apt update && sudo apt install wkhtmltopdf