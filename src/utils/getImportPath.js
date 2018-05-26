import resolveToModule from './resolveToModule';
export default function getImportPath(path: NodePath, importName: string): string {
  var globalBinding = path.scope.getGlobalScope().getBindings(); 
  return resolveToModule(globalBinding[importName][0])
}
