import invoke
from colorama import init

from kubesae import *


init(autoreset=True)


@invoke.task
def backend(c):
    c.config.env = "backend"
    c.config.namespace = "pointy-staging"
    c.config.build = "api"
    c.config.app = "pointy_api"


ns = invoke.Collection()
ns.add_collection(image)
ns.add_collection(aws)
ns.add_collection(deploy)
ns.add_collection(pod)
ns.add_task(backend)
ns.configure({"run": {"echo": True}})
