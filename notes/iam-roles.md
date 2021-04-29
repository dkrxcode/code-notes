## Overview

>> Users: people who can log in: alex, barb
>> Groups: groups of users with the same permissions: ex Devs
>> Service Account: an account for a service instead of a user
>> Roles are groups for services: EC2 access
>> Policies are definitions of permissions for groups and roles: s3FullAccess

User/SA -> group/role => policies

## 
users: alex, barb,
group: devs: [alex, barb]

IAM policy: read/write access to S3 bucket -> dev-bucket
- name: s3FullAccess

EC2 instance: backend service
- it's a service instead of a user
- it needs to access S3 bucket
- policies can not attack aws services
- roles allow aws services to act as a user with permissions

IAM Role: read/write S3 -> dev-bucket

## Role Properties:

name: Name of role, ex: EC2
type: type of aws resource/service that will need access: ex: EC2, Lambda, etc
attachedPolicies: list of policies, ex: s3FullAccess

Think of roles as IAM groups for services instead of users

SRE vs
Infrastructure Engineer
cloud operations
