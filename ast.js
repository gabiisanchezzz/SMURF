export class BinOp {
  constructor(l, r) {
    this.left  = l
    this.operation = r
  }
  accept(visitor) {
    return visitor.visitBinOp(this)
  }
}

export class IntegerValue {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    return visitor.visitInt(this)
  }
}

export class Statements
{
  constructor(statements)
  {
    this.statements = statements
  }

  accept(visitor)
  {
    return visitor.visitStatements(this)
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
    return visitor.visitAssignment(this)
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
    return visitor.visitVariableName(this)
  }
}

export class VariableValue
{
  constructor(value)
  {
    this.value = value
  }

  accept(visitor)
  {
    return visitor.visitVariableValue(this)
  }
}

export class variableDec
{
  constructor(l,r)
  {
    this.left = l
    this.right = r
  }

  accept(visitor)
  {
    return visitor.visitVariableDec(this)
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
    return visitor.visitrelOp(this)
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
  constructor(params, body)
  {
    this.params = params
    this.body = body
  }

  accept(visitor)
  {
    return visitor.visitFunctionDef(this)
  }
}

export class functionCall
{
  constructor(name,args)
  {
    this.name = name
    this.args = args
  }

  accept(visitor)
  {
    return visitor.visitFunctionCall(this)
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