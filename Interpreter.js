
const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
}


export default class Interpreter {

  constructor() 
  {
    this.binding =new Map();
  }

  visit(node) {
    return node.accept(this);
  }

  visitBinOp(node) 
  {
    let l = node.left.accept(this)
    /*let r = node.right.accept(this)*/

    return node.operation.reduce(
      (output, [op,right]) => {
        right = right.accept(this);
        if(op == "+")
        {
          return output + right
        }
        else if(op == "-")
        {
          return output - right
        }
        else if(op == "*")
        {
          return output * right
        }
        else if(op == "/")
        {
          return Math.round(output/right);
        }
      }, left
    );
  }

visitInt(node) 
{
  return node.value
}


visitAssignment(node)
{
  let variable = node.variable.accept(this)
  let expr = node.expr.accept(this)

  if(this.binding.has(variable))
  {
    this.setVariable(variable,expr)
  }
  else{
    throw("Error - Variable not found.")
  }
  return expr
}

visitVariableDec(node)
{
  let variable = node.variable.accept(this)
  let expr = node.expr.accept(this)
  this.setVariable(variable, expr)
  return expr
}

setVariable(node)
{
  this.binding.set(name,value)
}

getVariable(name)
{
  if(this.binding.has(name))
  {
    return this.binding.get(name)
  }
}

visitVariableValue(node)
{
  return this.getVariable(node.value)
}

visitrelOp(node)
{
  let l = node.left.accept(this)
  let op = node.op
  let r = node.right.accept(this)
  let output = false

  if(op == "==")
  {
    output = (left == right)
  }
  else if(op == "!=")
  {
    output == (left != right)
  }
  else if(op == ">=")
  {
    output == (left >= right)
  }
  else if(op == "<=")
  {
    output == (left <= right)
  }
  else if(op == ">")
  {
    output == (left > right)
  }
  else if(op == "<")
  {
    output == (left < right)
  }

  return output ? 1 : 0
}

visitStatements(node)
{
  let input = node.statements
  let temp = 0
  for(let each of input)
  {
    temp = each.accept(this)
  }
  return temp
}

visitifStatement(node)
{
  let condition = node.condition.accept(this)
  let ifStmt = node.ifStmt
  let elseStmt = node.elseStmt

  if(condition)
  {
    return ifStmt.accept(this)
  }
  else{
    return elseStmt.accept(this)
  }
}

/*visitFunctionDef(node)
{
  return node.body
}

visitFunctionCall(node)
{
  let bodyAst = node.name.accept(this)
  return bodyAst.accept(this)
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
  }*/

}
