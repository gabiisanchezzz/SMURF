{
    const AST = options.AST;
}

start
  = code

identifier
  = [A-Za-z_0-9]+

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = _ statements:statement+ _
  { return new AST.Statements(statements) }

statement
  = "let" __ declaration:variable_declaration
  { return declaration }
  / Assignment
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = name:VariableName "=" expression:expr
  { return new AST.variableDec(name, expression) }
  / name:VariableName
  { return new AST.variableDec(name, new AST.IntegerValue(0)) }
  

VariableValue
  = _ id:identifier _
  { return new AST.VariableValue(id.join("")) }

VariableName
  = _ id:identifier _
  { return new AST.VariableName(id.join("")) }

//////////////////////////////// if/then/else /////////////////////////////

ifStatement
  = expr:expr code:brace_block "else" rest:brace_block
  { return new AST.ifStatement(expr, code, rest) }
  / expr:expr code:brace_block
  { return new AST.ifStatement(expr, code, []) }

//////////////////////////////// Assignment /////////////////////////////

Assignment
  = left:VariableName "=" right:expr
  { return new AST.Assignment(left, right) }

//////////////////////////////// expression /////////////////////////////

expr
  = _ "fn" def:function_definition
  { return def }
  / _ "if" expr:ifStatement
  { return expr }
  / boolean_expression
  / arithmetic_expression

/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = left:arithmetic_expression op:relop right:arithmetic_expression
  { return new AST.relOp(left, op, right) }

//////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = left:mult_term rest:(addop mult_term)*
    { 
      if(rest.length == 0)
        return left;
      return new AST.BinOp(left, rest);
    }

mult_term
  = left:primary rest:(mulop primary)*
    { 
      if(rest.length == 0)
        return left;
      return new AST.BinOp(left, rest); 
    }

primary
  = integer
  / function_call
  / VariableValue
  / _ "(" expression:arithmetic_expression ")" _
  { return expression }

integer
  = _ sign:("+" / "-")? digits:digits _
  { 
    if(sign == "-")
      return new AST.IntegerValue((parseInt(digits.join(""), 10) * -1)); 
    return new AST.IntegerValue(parseInt(digits.join(""), 10));
  }

digits
  = [0-9]+

addop
  = '+' / '-'

mulop
  = '*' / '/'

relop
  = '==' / '!=' / '>=' / '>' / '<=' / '<'

//////////////////////////////// function call /////////////////////////////

function_call
  = _ name:VariableValue "(" _ ")" _ 
  { return new AST.functionCall(name, []) }

//////////////////////// function definition /////////////////////////////

function_definition
  = params:param_list code:brace_block
  { return new AST.functionDef(params, code) }

param_list
   = _ "(" _ ")" _

brace_block
  = _ "{" code:code "}" _
  { return code }

//////////////////////// spacing /////////////////////////////

eol
  = [\n\r\u2028\u2029]

space
  = eol / [ \t]
_
  = space*

__
  = space+