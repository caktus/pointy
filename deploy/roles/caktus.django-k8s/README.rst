caktus.django-k8s
=================

An Ansible role with sane defaults to deploy a Django app to Kubernetes.


License
~~~~~~~~~~~~~~~~~~~~~~

This Ansible role is released under the BSD License.  See the `LICENSE
<https://github.com/caktus/ansible-role-aws-web-stacks/blob/master/LICENSE>`_
file for more details.

Development sponsored by `Caktus Consulting Group, LLC
<http://www.caktusgroup.com/services>`_.


Requirements
~~~~~~~~~~~~~~~~~~~~~~

* ``pip install openshift kubernetes-validate``


Installation
------------

1. Add to your ``requirements.yml``:

.. code-block:: yaml

    ---
    # file: deployment/requirements.yaml

    - src: https://github.com/caktus/ansible-role-django-k8s
      name: caktus.django-k8s

2. Add the role to your playbook:

.. code-block:: yaml

    ---
    # file: deploy.yaml

    - hosts: k8s_clusters
      vars:
        ansible_python_interpreter: "{{ ansible_playbook_python }}"
      roles:
      - role: caktus.django-k8s

3. Create an inventory file for your clusters:

.. code-block:: yaml

    ---
    # file: inventory.yaml

    all:
      children:
        k8s_clusters:
          vars:
            ansible_connection: local
          hosts:
            gcp-staging:
              k8s_kube_context: <name of context from ~/.kube/config>
              k8s_domain_names:
              - www.example.com

See ``defaults/main.yml`` for all the variables that can be overridden.


Configuration
-------------


Celery
``````

.. code-block:: yaml

  # Required to enable:
  k8s_worker_enabled: true
  k8s_worker_celery_app: "<app.celery.name>"
  k8s_worker_beat_enabled: true  # only if beat is needed

  # Optional variables (with defaults):
  k8s_worker_replicas: 2
  k8s_worker_image: "{{ k8s_container_image }}"
  k8s_worker_image_pull_policy: "{{ k8s_container_image_pull_policy }}"
  k8s_worker_image_tag: "{{ k8s_container_image_tag }}"
  k8s_worker_resources: "{{ k8s_container_resources }}"
