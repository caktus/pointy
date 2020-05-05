# Deployment


## Build and Deploy

The most common uses cases are building images and deploying images, so
this document covers these topics first.

**If this is your first time, please see the Local Deployment Environment Setup
section before continuing.**

To get setup, make sure to install the deploy Python requirements:

```sh
   pip install -r deploy/requirements.txt
```


### Build

First, make sure we have access to the ECR registry with ``docker``:

```sh
    inv aws.docker-login
```

You should see *Login Succeeded*.

By default, the next command will perform the following:
* Building the production Docker image
* Tagging it with the ``{{ branch_name }}-{{ short_commit_sha }}``
* Pushing the image to ECR so it's accessible to EKS for deployment


```sh
    inv production web image
    inv production api image
```

You should now see the built and tagged image in ``docker images``.  You are going to see
a ``<none>`` image. This is the node image and should be left in place to shorten build times.


#### Test the Docker image locally

You can test the deployable image locally with:

```sh
  inv image.up
```

You should see all the supporting containers come up. Then navigate to
http://localhost:8000 you should see the site in it's current state.


### Deploy

For a full deploy, run:

```sh
    inv production api image deploy web image deploy
```


## Local Deployment Environment Setup

This project uses ``ansible``, ``invoke`` and ``awscli`` for deployment. The
following instructions walk through setting up your local environment.

First, obtain the Ansible vault password from the *Pointy vault pass*
LastPass entry and add it to a ``deploy/.vault_pass`` file in the repo:

```sh
  echo THE_PASSWORD_FROM_LASTPASS > deploy/.vault_pass
```


### Access to Cluster


#### 1. Create IAM user

To access the EKS cluster with ``kubectl``, you need an IAM user with the
correct access permissions. Ask someone with AWS admin privledges to create an
IAM user in the AWS console with only **Progromatic Access** and added to the
**Admins** group. They should provide you with the generated AWS access key and
secret using a secure method.


##### Grant your IAM user access to the cluster

To grant your IAM user access to the cluster, an existing AWS admin needs to
follow the steps in
[Managing Users or IAM Roles for your Cluster](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html).
This was referenced from
[Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)

Assuming you have your AWS account and CLI working, to get your ARN for the admin to use run the following aws-cli command:

```sh
  aws iam get-user
```

The administrator needs to edit the following YAML to reflect the real values from the output of the above command:

```yaml
    - userarn: arn:aws:iam::472354598015:user/copelco-test
      username: copelco-test
      groups:
        - system:masters
```

The YAML above needs to be added to the ``data.mapUsers`` list in:

```sh
    kubectl edit -n kube-system configmap/aws-auth
```


#### 2. Configure AWS named profile

Configure an awscli
[named profile](http://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
using AWS access keys for the Caktus Cluster AWS account:

```sh
  aws configure --profile caktus-cluster
  >> AWS Access Key ID [None]: YOUR_AWS_ACCESS_KEY
  >> AWS Secret Access Key [None]: YOUR_AWS_SECRET_ACCESS_KEY
  >> Default region name [None]: us-east-1
  >> Default output format [None]:
```

Now set the ``AWS_PROFILE`` environment variable to use this named profile:

```sh
  export AWS_PROFILE=caktus-cluster
```

Note: If you use ``virtualenvwrapper`` on a Linux machine you can set
``AWS_PROFILE`` in ``postactivate``.


#### 3. Configure cluster context using EKS token

To configure cluster access for the ``kubectl`` command-line tool, with the
``AWS_PROFILE`` defined above, add the cluster context using:

```sh
    inv aws.configure-eks-kubeconfig --cluster=caktus-saguaro-cluster
```

You should now have access ``kubectl`` access:

```sh
    kubectl get node
```


# CloudFormation and Cluster Provisioning

The Pointy deployed environment is provisioned using
[aws-web-stacks](https://github.com/caktus/aws-web-stacks) and
[caktus.k8s-web-cluster](https://github.com/caktus/ansible-role-k8s-web-cluster).
The cluster configuration is stored in
[caktus-hosting-services](https://github.com/caktus/caktus-hosting-services).
This process is mananaged by Tech Support and/or the deployment team and is not
included in this repository.
