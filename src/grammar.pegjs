{
  const AST = options.AST
}

calculator
  = arithmetic_expression

addop
  = '+' / '-'

  arithmetic_expression
    = left:mult_term rest:(addop mult_term)*
    { return rest.reduce(
      (result, [op, _, right]) => new AST.BinOp(result, op, right),
      left
    )}



mult_term
= left:integer "*" rest:mult_term
{
  return rest.reduce(
    (result, [op, _, right]) => new AST.BinOp(result, op, right),
    left
  )
}

primary
= integer
/"(" arithmetic_expression ")"
// | function_call
// | variable_value

integer
= plusOrMinus:("+" / "-")? digits:digits
{
  return new AST.Integer(parseInt(plusOrMinus, digits.join(""), 10))
}

digits
= [0-9]+