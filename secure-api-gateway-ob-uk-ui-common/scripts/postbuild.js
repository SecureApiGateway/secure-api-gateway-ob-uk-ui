#!/usr/bin/env node

const path = require('path'),
  fs = require('fs-extra');

const PACKAGE_ROOT = path.join(__dirname, '..');
const DIST_PATH = path.join(PACKAGE_ROOT, 'dist');

async function generateSecondaryEntryPackageJsons(version) {
  const pkgDirs = await fs.readdir(DIST_PATH);
  for (const pkgDir of pkgDirs) {
    const pkgPath = path.join(DIST_PATH, pkgDir);
    const stat = await fs.stat(pkgPath).catch(() => null);
    if (!stat || !stat.isDirectory()) continue;
    const parentPkgPath = path.join(pkgPath, 'package.json');
    if (!await fs.pathExists(parentPkgPath)) continue;
    const parentPkg = await fs.readJson(parentPkgPath);
    const exports = parentPkg.exports || {};
    for (const [exportKey, exportVal] of Object.entries(exports)) {
      if (exportKey === '.' || exportKey === './package.json') continue;
      const subName = exportKey.replace(/^\.\//, '');
      const subDir = path.join(pkgPath, subName);
      if (!await fs.pathExists(subDir)) continue;
      const subPkgPath = path.join(subDir, 'package.json');
      // ng-packagr 16+ uses 'default' (fesm2022); ng-packagr 15 used 'es2015' (fesm2015)
      if (typeof exportVal !== 'object' || exportVal === null) continue;
      const defaultEntry = exportVal.default || exportVal.es2015;
      if (!defaultEntry) continue;
      const bundleFile = path.basename(defaultEntry);
      const bundleDir = path.dirname(defaultEntry).replace(/^\.\//, '');
      if (!bundleFile) continue;
      const subPkg = {
        name: `${parentPkg.name}/${subName}`,
        version,
        main: `../${bundleDir}/${bundleFile}`,
        module: `../${bundleDir}/${bundleFile}`,
        typings: 'index.d.ts',
        sideEffects: false
      };
      await fs.outputJson(subPkgPath, subPkg, { spaces: 2 });
    }
  }
}

async function run() {
  try {
    const { name, version, license } = await fs.readJson(path.join(PACKAGE_ROOT, 'package.json'));

    await fs.outputJson(path.join(DIST_PATH, 'package.json'), {
      name,
      version,
      license
    });
    await fs.copy(path.join(PACKAGE_ROOT, 'LICENSE'), path.join(DIST_PATH, 'LICENSE'));
    await generateSecondaryEntryPackageJsons(version);

    console.info('package.json and License updated');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
