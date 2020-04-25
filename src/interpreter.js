import { Assignment, VariableValue, relOp, functionDef, functionCall } from "../ast.js"

const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
}


export default class Interpreter {

  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
  }

  visit() {
    return this.target.accept(this)
  }

  BinOp(node) {
    let l = node.left.accept(this)
    let r = node.right.accept(this)

    if(Operations[node.op](l, r) == true)
    {
      return 1
    }
    if(Operations[node.op](l,r) == false)
    {
      return 0
    }
    return Operations[node.op](l,r)
  }

  IntegerValue(node) {
    return node.value
  }
// } DT

Assignment(node)
{
  let variable = node.variable.accept(this)
  let expr = node.expr.accept(this)
  this.setVariable(variable,expr)
  return expr
}

VariableName(node)
{
  return node.name
}

setVariable(node)
{
  let name = node.name.accept(this)
  this.binding.set(name,value)
}

getVariable(name)
{
  return this.binding.get(name)
}

VariableValue(node)
{
  return this.getVariable(node.name)
}

relOp(node)
{
  let l = node.left.accept(this)
  let r = node.right.accept(this)
  return Operations[node.op](l,r)
}

ifStatement(node)
{
  let condition = node.condition.accept(this)
  let ifStmt = node.ifStmt.accept(this)
  let elseStmt = node.elseStmt.accept(this)

  if(condition == 0)
  {
    return elseStmt
  }
  else{
    return ifStmt
  }
}

functionDef(node)
{
  return node.list.accept(this)
}

functionCall(node)
{
  let bodyAst = node.name.accept(this)
  return bodyAst
}

visitCode(node)
{
  let result = null
  for(let i of node.statements)
  {
    let val = i.accept(this)
    if(val != null)
    {
      result = val
    }
    return result
  }
}

} // DT