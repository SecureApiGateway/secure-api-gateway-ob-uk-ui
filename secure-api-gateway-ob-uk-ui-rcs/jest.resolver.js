#!/usr/bin/env node
const path = require('path');

// Force @angular/* imports to resolve from rcs node_modules regardless of the importing file's
// location. Without this, files inside ../secure-api-gateway-ob-uk-ui-common/dist/ (loaded as
// a file: dependency) resolve @angular/* from common's own node_modules, creating a second
// Angular instance that conflicts with the TestBed injector. Scope is intentionally limited to
// @angular/* — other scoped packages (@ngrx/*, @angular-devkit/*) are not compiled into the
// common dist and do not trigger the same problem.
const ANGULAR_SCOPED = /^@angular\//;
const rcsNodeModules = path.resolve(__dirname, 'node_modules');

const ngJestResolver = (request, options) => {
  if (ANGULAR_SCOPED.test(request)) {
    return options.defaultResolver(request, {
      ...options,
      basedir: rcsNodeModules,
      packageFilter(pkg) {
        return { ...pkg, main: pkg.main || pkg.es2015 || pkg.module };
      }
    });
  }
  return options.defaultResolver(request, {
    ...options,
    packageFilter(pkg) {
      return { ...pkg, main: pkg.main || pkg.es2015 || pkg.module };
    }
  });
};

module.exports = ngJestResolver;
