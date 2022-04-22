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


## 3. Configure AWS CLI access

This project uses the CaktusAccessRole to access AWS resources. If you are
unsure of what this means, refer to the [Caktus Developer
Documentation](https://caktus.github.io/developer-documentation/developer-onboarding/AWS/).

Once configured, you should have access buckets similar to these:

```shell
❯ aws s3 ls      
2020-04-10 14:37:40 aws-web-stacks-caktus-cluster
2020-04-10 15:01:18 aws-web-stacks-caktus-saguaro
2022-02-15 14:32:23 bakery-demo-wagtail
2020-04-15 15:40:00 caktus-saguaro-assetsbucket-boy18lc6f0gy
2020-04-15 15:39:57 caktus-saguaro-privateassetsbucket-enzclvqfo1ze
2021-11-23 11:39:41 caktus-saguaro-sftpassetsbucket-ykf4yml1lfvj
```


### Build

By default, the next command will perform the following:
* Building the production Docker image
* Tagging it with the ``{{ branch_name }}-{{ short_commit_sha }}``
* Pushing the image to ECR so it's accessible to EKS for deployment

```sh
    inv production build-deploy --no-deploy
```

You should now see the built and tagged image in ``docker images``. You are
going to see a ``<none>`` image. This is the node image and should be left in
place to shorten build times.


#### Test the Docker image locally

You can test the deployable image locally with:

```sh
  inv local build-deploy
  inv image.up
```

You should see all the supporting containers come up. Then navigate to
http://localhost:3000 you should see the site in it's current state.


### Deploy

For a full deploy, run:

```sh
    inv production build-deploy
```
