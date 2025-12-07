#!/bin/bash
set -e

# Update packages
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user

# Install docker-compose v2
sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64" \
  -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Placeholders for backend.env and docker-compose.yml
# (You'll scp these from your local machine or GitHub later)
echo "Init done. Remember to copy docker-compose.yml and backend.env here."
