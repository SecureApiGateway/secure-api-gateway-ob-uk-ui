name := securebanking-ui
service := rcs
repo := europe-west4-docker.pkg.dev/sbat-gcr-develop/sapig-docker-artifact
helm_repo := forgerock-helm/secure-api-gateway/securebanking-ui/
latesttagversion := latest

update_cli:
	cd secure-api-gateway-ob-uk-ui-cli
	npm version patch --no-git-tag-version

update_common:
	cd secure-api-gateway-ob-uk-ui-cli
	npm version patch --no-git-tag-version

update_rcs:
	cd secure-api-gateway-ob-uk-ui-rcs
	npm version patch --no-git-tag-version

update_versions:
	npm version patch

# docker target
docker:
ifndef tag
	$(warning no tag supplied; latest assumed)
	$(eval TAG=latest)
else
	$(eval TAG=$(shell echo $(tag) | tr A-Z a-z))
endif
ifndef setlatest
	$(warning no setlatest true|false supplied; false assumed)
	$(eval setlatest=false)
endif
	@if [ "${setlatest}" = "true" ]; then \
		docker build -f secure-api-gateway-ob-uk-ui-${service}/projects/${service}/docker/Dockerfile -t ${repo}/securebanking/ui/${service}:${tag} -t ${repo}/securebanking/ui/${service}:${latesttagversion} . ; \
		docker push ${repo}/securebanking/ui/${service} --all-tags; \
	else \
		docker build -f secure-api-gateway-ob-uk-ui-${service}/projects/${service}/docker/Dockerfile -t ${repo}/securebanking/ui/${service}:${tag} . ; \
  	docker push ${repo}/securebanking/ui/${service}:${tag}; \
	fi;
# Helm target
package_helm:
ifndef version
	$(error A version must be supplied, Eg. make helm version=1.0.0)
endif
	helm dependency update _infra/helm/${name}
	helm template _infra/helm/${name}
	helm package _infra/helm/${name} --version ${version} --app-version ${version}

publish_helm:
ifndef version
	$(error A version must be supplied, Eg. make helm version=1.0.0)
endif
	jf rt upload  ./*-${version}.tgz ${helm_repo}
