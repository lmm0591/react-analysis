import resolveToModule from './resolveToModule';
export default function getImportPath(path: NodePath, importName: string): ?string {
  var globalBinding = path.scope.getGlobalScope().getBindings(); 
  return (globalBinding && globalBinding[importName]) ? resolveToModule(globalBinding[importName][0]) : null
}
