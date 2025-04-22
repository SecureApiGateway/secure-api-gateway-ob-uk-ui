### pipelines
- [codefresh project sbat-infra](https://g.codefresh.io/projects/ForgeCloud~2Fsbat-infra/edit/pipelines/?projectId=6026619964db840ccbb14863)
  - **infrastructure**
    - **initialise-cluster**
  - **service-build**: triggered on PR commits or Merge master
    - **environment-build**: triggered from service-build pipeline

#### Service-build
- Parameters passed:
  - PR: -v TAG=${{ env.PR_NUMBER }} -v SERVICE_NAME=ui -v ENVIRONMENT=${{ github.actor }} -v BRANCH=${{ github.head_ref }}
  - MERGE: -v SERVICE_NAME=ui
We need to pass the below parameters when the environment = nightly:
  - DOMAIN "dev-cdk-core.forgerock.financial"
  - PLATFORM ""
    AUTHORIZATION_URL "https://iam.DOMAIN"
    AUTHENTICATION_URL "https://iam.DOMAIN"
    REMOTE_CONSENT_URL "https://rcs.DOMAIN"
When merge action is triggered at the end of the action is triggered the codefresh pipeline `service-build` 
- [service-build pipeline](https://g.codefresh.io/pipelines/edit/workflow?id=6144a0a5823f660c13495a63&pipeline=service-build&projects=ForgeCloud%2Fsbat-infra&projectId=6026619964db840ccbb14863&rightbar=steps&context=github-bot)
- [yaml pipeline](https://github.com/ForgeCloud/sbat-infra/blob/master/pipeline/template/service.yml)
