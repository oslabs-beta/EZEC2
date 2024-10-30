# EZEC2

## Overview

We built EZEC2 for teams that want visibility into their EC2 resources with the ability to easily automate shutdowns. EZEC can be run locally or hosted on an EC2 instance for persistent enforcement of shutdown/startup schedules.

## Getting Started

Using EZEC2 requires IAM Access Role that can access EC2 resources, retrieve Cloudwatch Data, and start/stop EC2 instances.
Scheduling functionality will persist via connection to a MongoDB Database.

## Running Locally

- **Disclaimer:** If running EZEC2 locally, scheduled instance starts and stops will only happen if your server is running.
- Fork the repo, clone it to your local machine
- Set the .env variable for your MONGO_URI
- Configure your AWS SSO for the AWS CLI. Your SSO role must have the IAM Access Role with access described above.
- The configred AWS SSO Role should be under your _default_ settings in the AWS SSO Config file.
- The file must be accessible from the working directory of where you are running EZEC

## Running on an EC2 instance

- Fork the repo
- Deploy EZEC2 to an EC2 instance with an IAM Access Role with the permissions described above. You can use the deployment method of your choice (e.g. Elastic Beanstalk)
- Set the .env variable for your MONGO_URI
- Set the .env variable for your MANAGER_INSTANCE_ID - this will ensure you cannot stop the EC2 instance that's hosting EZEC2
- Ensure the security policy for the host instance limits access to your host instance. EZEC2 will allow someone to start/stop all of your EC2 resources.
