import invoke
from colorama import init

from kubesae import *


init(autoreset=True)


@invoke.task
def api(c):
    c.config.env = "staging"
    c.config.namespace = "pointy-staging"
    c.config.build = "api"
    c.config.app = "pointy_api"


@invoke.task
def web(c):
    c.config.env = "staging"
    c.config.namespace = "pointy-staging"
    c.config.build = "web"
    c.config.app = "pointy_web"


ns = invoke.Collection()
ns.add_collection(image)
ns.add_collection(aws)
ns.add_collection(deploy)
ns.add_collection(pod)
ns.add_task(api)
ns.add_task(web)
ns.configure({"run": {"echo": True}})
