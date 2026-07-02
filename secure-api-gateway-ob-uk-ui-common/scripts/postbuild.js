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
      if (typeof exportVal !== 'object' || !exportVal.es2015) continue;
      // exportVal.es2015 is like "./fesm2015/pkg-sub.mjs" — extract just the filename
      const es2015File = path.basename(exportVal.es2015);
      if (!es2015File) continue;
      const subPkg = {
        name: `${parentPkg.name}/${subName}`,
        version,
        main: `../fesm2015/${es2015File}`,
        module: `../fesm2015/${es2015File}`,
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
