export class BinOp {
  constructor(l, op, r) {
    this.left  = l
    this.op    = op
    this.right = r
  }
  accept(visitor) {
    return visitor.BinOp(this)
  }
}

export class IntegerValue {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    return visitor.IntegerValue(this)
  }
}

export class Assignment
{
  constructor(l,r)
  {
    this.variable = l
    this.expr = r
  }

  accept(visitor)
  {
    return visitor.Assignment(this)
  }
}

export class VariableName
{
  constructor(name)
  {
    this.name = name
  }

  accept(visitor)
  {
    return visitor.VariableName(this)
  }
}

export class VariableValue
{
  constructor(name)
  {
    this.name = name
  }

  accept(visitor)
  {
    return visitor.VariableValue(this)
  }
}

export class relOp
{
  constructor(l,op,r)
  {
    this.left = l
    this.relOp = op
    this.right = r
  }

  accept(visitor)
  {
    return visitor.relOp(this)
  }
}

export class ifStatement
{
  constructor(cond, ifStmt, elseStmt)
  {
    this.condition = cond
    this.ifStmt = ifStmt
    this.else = elseStmt
  }

  accept(visitor)
  {
    return visitor.ifStatement
  }
}

export class functionDef
{
  constructor(params, list)
  {
    this.params = params
    this.list = list
  }

  accept(visitor)
  {
    return visitor.FunctionDef(this)
  }
}

export class functionCall
{
  constructor(name)
  {
    this.name = name
  }

  accept(visitor)
  {
    return visitor.FunctionCall(this)
  }
}

export class code
{
  constructor(statements)
  {
    this.statements = statements
  }

  accept(visitor)
  {
    return visitor.visitCode(this)
  }
}

export class nullStatements
{
  constructor(){}

  accept(visitor)
  {
    return visitor.visitNull(this)
  }
}