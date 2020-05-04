 import * as AST from "./ast.js"
 import Interpreter from "./interpreter.js"


export default function compileAndRun(parser, script, printFunction) {
  let  ast = parser.parse(script, { AST: AST })
  // console.log("AST:", ast)

  let interpreter = new Interpreter(ast, printFunction)
  let result = interpreter.visit()

  // console.log("Result:", result)

  return result
}
