# [Choice] Debian OS version: bullseye, buster
ARG VARIANT="jammy"
ARG PLATFORM="amd64"
FROM --platform=${PLATFORM} mcr.microsoft.com/devcontainers/base:${VARIANT}
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

# RUN sudo apt update && sudo apt install weasyprint

ARG VARIANT="jammy"
ARG PLATFORM="amd64"
# wkhtmltopdf
# RUN sudo apt update && sudo apt install wkhtmltopdf
RUN sudo apt update && apt -y upgrade
RUN sudo apt install -y wget
RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.${VARIANT}_${PLATFORM}.deb
# https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
RUN sudo apt install -y \
                fontconfig \
                libfreetype6 \
                libjpeg-turbo8 \
                libpng16-16 \
                libx11-6 \
                libxcb1 \
                libxext6 \
                libxrender1 \
                xfonts-75dpi \
                xfonts-base
 
RUN dpkg -i wkhtmltox_0.12.6.1-2.${VARIANT}_${PLATFORM}.deb