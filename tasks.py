import invoke
from colorama import init

from kubesae import *


init(autoreset=True)


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


ns = invoke.Collection()
ns.add_collection(image)
ns.add_collection(aws)
ns.add_collection(deploy)
ns.add_collection(pod)
ns.add_task(production)
ns.add_task(api)
ns.add_task(web)
ns.configure({"run": {"echo": True}})
