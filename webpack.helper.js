const fs = require('fs');
const path  = require('path');

const expression = new RegExp('@@snippet\\s\\s*\'(.*)\';', 'gm');

function getFileAbsPath(sourceDir, filePath) {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(sourceDir, filePath);
}

function createImport(componentName, fileName) {
  return `import ${componentName} from '${fileName}';`;
}

function createPlayground(componentName, code) {
  // Code to be used in future
  return `<Playground Component={${componentName}} />`;
}

function createCodeBlock(code) {
  return '```tsx' + '\n' + (code.trim()) + '\n' + '```';
}

function replacer(componentName, importPath, code) {
  // \n\n is required to delimit the code from rest of the content of mdx file.
  return (
    '\n\n'
    + createImport(componentName, importPath)
    + '\n\n'
    + createPlayground(componentName, code)
    + '\n\n'
    + createCodeBlock(code)
  );
}

// TODO - Make the loader async
module.exports = function SnippetLoader(source) {

  // The directory where the mdx file lies.
  const sourceDir = path.dirname(this.resourcePath);

  // Mutable value to autogenerate names for default exports
  let counter = 0;

  const newMDX = source.replace(expression, (match, p1) => {

    const matchedFileName = p1;
    const resolveFilePath = getFileAbsPath(sourceDir, matchedFileName);

    const absFilePath = path.extname(resolveFilePath) === ''
      ? `${resolveFilePath}.tsx` : '';

    const componentName = `Example${counter++}`;

    // Set webpack watching - Adds given file to the webpack dependency graph
    this.addDependency(absFilePath);

    // Read the files content as string
    const codeSnippets = fs.readFileSync(absFilePath, { encoding: 'utf-8' });

    return replacer(componentName, matchedFileName, codeSnippets);
  });

  return newMDX;
}
