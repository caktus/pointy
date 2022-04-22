import invoke
from colorama import init

import kubesae

init(autoreset=True)


@invoke.task
def local(c):
    c.config.base_env = "local"
    with c.cd("frontend/"):
        c.run('rm .env.production', warn=True)


@invoke.task
def production(c):
    c.config.base_env = "production"
    c.config.namespace = f"pointy-{c.config.base_env}"
    with c.cd("frontend/"):
        c.run('echo "REACT_APP_WS_HOST_ADDRESS=wss://pointy.caktus-built.com" > .env.production')


@invoke.task
def api(c):
    c.config.service = "api"
    c.config.app = f"pointy_{c.config.service}"
    c.config.repository = "472354598015.dkr.ecr.us-east-1.amazonaws.com/pointy_api"
    c.config.env = f"{c.config.base_env}-{c.config.service}"


@invoke.task
def web(c):
    c.config.service = "web"
    c.config.app = f"pointy_{c.config.service}"
    c.config.repository = "472354598015.dkr.ecr.us-east-1.amazonaws.com/pointy_web"
    c.config.env = f"{c.config.base_env}-{c.config.service}"


@invoke.task
def build_deploy(c, push=True, deploy=True):
    if c.config.base_env == "local":
        push = False
    # Build
    kubesae.image['tag'](c)
    api(c)
    with c.cd("backend/"):
        kubesae.image['build'](c)
    web(c)
    with c.cd("frontend/"):
        kubesae.image['build'](c)
    # # Push
    # if push:
    #     # Docker authenciation
    #     kubesae.aws["docker-login"](c)
    #     api(c)
    #     kubesae.image['push'](c)
    #     web(c)
    #     kubesae.image['push'](c)
    # # Deploy
    # if push and deploy:
    #     kubesae.deploy["install"](c)
    #     api(c)
    #     kubesae.deploy["deploy"](c)
    #     web(c)
    #     kubesae.deploy["deploy"](c)


ns = invoke.Collection()
ns.add_collection(kubesae.image)
ns.add_collection(kubesae.aws)
ns.add_collection(kubesae.deploy)
ns.add_collection(kubesae.pod)
ns.add_task(production)
ns.add_task(api)
ns.add_task(web)
ns.add_task(build_deploy)
ns.add_task(local)
ns.configure({"run": {"echo": True}})
