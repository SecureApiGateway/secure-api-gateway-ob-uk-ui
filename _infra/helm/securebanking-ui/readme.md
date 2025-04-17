# Secure API Gateway - Remote Consent Service UIs

See [README](https://github.com/SecureApiGateway/secure-api-gateway-ob-uk-ui/blob/master/README.md) for information on RCS UI

## Prerequisites

- Kubernetes v1.23 +
- Helm 3.0.0 +

To add the forgerock helm artifactory repository to your local machine to consume helm charts use the following;

```console
  helm repo add forgerock-helm https://maven.forgerock.org/artifactory/forgerock-helm-virtual/ --username [backstage_username]  --password [backstage_password]
  helm repo update
```

NOTE: You must have a valid [subscription](https://backstage.forgerock.com/knowledge/kb/article/a57648047#XAYQfS) to aquire the `backstage_username` and `backstage_password` values.

## Helm Charts
### Deployment
RCS UI should only be installed as part of the [secure-api-gateway umbarella chart](https://github.com/SecureApiGateway/secure-api-gateway-releases/tree/master/secure-api-gateway) and not standalone from this repositry.  

However, as part of the deployment of the secure-api-gateway, you must build the java artifacts and built the docker image via the [Makefile](https://github.com/SecureApiGateway/secure-api-gateway-ob-uk-ui/blob/master/Makefile). 

Only once this has been done for all the components, can the [steps to deploy](https://github.com/SecureApiGateway/secure-api-gateway-releases/tree/master/secure-api-gateway/readme.md) the secure-api-gateway be performed.

### Example Manifest
This is an example manifest using the `values.yaml` file provided, there is no overlay values in this generated manifest hence why there is no repo URL in `spec.template.spec.containers.0.image`.

```yaml
---
# Source: securebanking-ui/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: remote-consent-service-user-interface
  labels:
    app: remote-consent-service-user-interface
spec:
  type: ClusterIP
  ports:
  - name: remote-consent-service-user-interface
    port: 8080
    targetPort: 80
    protocol: TCP
  selector:
    app: remote-consent-service-user-interface
---
# Source: securebanking-ui/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: remote-consent-service-user-interface
  labels:
    app: remote-consent-service-user-interface
spec:
  replicas: 1
  strategy:
    type: RollingUpdate
    
    rollingUpdate:
      maxSurge: 50%
      maxUnavailable: 25%
    
  selector:
    matchLabels:
      app: remote-consent-service-user-interface
  template:
    metadata:
      labels:
        app: remote-consent-service-user-interface
        appVersion: 1.0.1
        helmVersion: 1.0.1
    spec:
      containers:
        - name: remote-consent-service-user-interface
          image: ":1.0.1"
          imagePullPolicy: Always
          ports:
            - name: http-server
              containerPort: 8080
          env:
            - name: PORT
              value: "8080"
            - name: TEMPLATE
              value: forgerock
            - name: IDENTITY_PLATFORM_FQDN
              valueFrom:
                configMapKeyRef:
                  name: rs-sapig-deployment-config
                  key: IDENTITY_PLATFORM_FQDN
            - name: RS_FQDN
              valueFrom:
                configMapKeyRef:
                  name: rs-sapig-deployment-config
                  key: RS_FQDN
          resources:
            limits:
              cpu: 0.5
              memory: 512Mi
            requests:
              cpu: 0.25
              memory: 256Mi
```
### Environment Variables

These are the environment variables declared in the `deployment.yaml`;
| Key | Default | Description | Source |
|-----|---------|-------------|--------|
| PORT | 8080 | What port does the container use |deployment.containerPort |
| TEMPLATE | forgerock | | deployment.template |
| IDENTITY_PLATFORM_FQDN | | iam.forgerock.financial | Custom Domain created in Cloud Instance | ob-deployment-config |
| RS_FQDN | sapig.forgerock.financial | IG DNS to be used | ob-deployment-config |


### Values
These are the values that are consumed in the `deployment.yaml` and `service.yaml`;
| Key | Type | Description | Default |
|-----|------|-------------|---------|
| deployment.apiVersion| string | Version of the Kubernetes API to use | apps/v1 |
| deployment.containerPort | integer | Container port exposed by a pod or deployment | 8080 |
| deployment.image.repo | string | Repo to pull images from - Value should exist in values.yaml overlay in deployment repo | {} |
| deployment.image.tag | string | Tag to deploy - Value should exist in values.yaml overlay in deployment repo | {} |
| deployment.image.imagePullPolicy | string | Policy for pulling images | Always |
| deployment.resources.limits.cpu | integer | Max amount of CPU the pod can consume | 0.5 |
| deployment.resources.limits.memory | string | Max amount of memory the pod can consume | 512Mi |
| deployment.resources.requests.cpu | integer | Minimum requested CPU required to run the pod | 0.25 |
| deployment.resources.requests.memory | string | Minimum requested memory required to run the pod | 256Mi |
| deployment.rollingUpdate.maxSurge | string | The maximum number of pods that can be scheduled above the desired number of pods | 50% |
| deployment.rollingUpdate.maxUnavailable | string | The maximum number of pods that can be unavailable during the update | 25% |
| deployment.starategyType | string | Type of deployment | RollingUpdate |
| deployment.templateName | string | | forgerock |
| service.apiVersion | string | Version of the Kubernetes API to use | v1 |
| service.port | integer | Container port exposed by a pod or deployment | 8080 |
| service.protocol | string | Protocol the service will use | TCP |
| service.targetPort | integer | Host Machine port that traffic is diverted too | 80 | 
| service.type | string | Type of service to create | ClusterIP |

NOTE: There is no `deployment.image.repo` or `deployment.image.tag` specified in the `Values.yaml` - This needs to be done in a seperate 'deployments' repo using an additional `values.yaml` overlay. You may overwrite any of the other values in this additonal file if required.

Example of the RCS section of the additonal `values.yaml` file;
```yaml
remote-consent-service-user-interface:
  deployment:  
    image:
      repo: [REPO_URL]
      # By default the AppVersion will be used so that users don't have to change this value, however you can override this by uncommenting the line and providing a valid verison.
      # tag: 1.0.1
```
## Support

For any issues or questions, please raise an issue within the [SecureApiGateway](https://github.com/SecureApiGateway/SecureApiGateway/issues) repository.
