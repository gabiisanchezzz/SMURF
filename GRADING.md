# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | 1 failure   |     63 |
| extras         | 0 failures  |     10 |  ** wow! **
| Coding         |             |     20 |
| **TOTAL**      |             |     93 |

Just two comments on the code:

File: Interpreter.js
53:       if (args.length > 0) {
54:         params.forEach((param, i) => {
55:           params[i] = param[2].accept(this)
56:         })
57:
58:         args.forEach((arg, i) => {
59:           args[i] = arg[2].accept(this)
60:         })
61:
62:         if (params.length != args.length) {
63:           throw new Error("Parameters and arguments are not equal in length")
64:         }
65:
66:         params.forEach((param, i) => {
67:           newBinding.setVariable(param, args[i])
68:         })
69:       }

This works, but

1. Why do you need the test for length > 0?

2. Why three loops. Could you not have just one?

    for (let i = 0; i < params.length; i++) {
      let name = params[i].accept(this)
      let value = args[i].accept(this)
      newBinding.setVariable(name, value)
    }

3. In general overwriting data in things that were passed to you is poor
   form :)

In addition, there's a bug: if there are no arguments in the call, then
the test on line 62 never gets called, and so if the function is
actually defined to take parameters, no error will be reported.


File: Interpreter.js
74:       while (this.binding.parent != null) {
75:         this.binding = this.binding.pop()
76:       }
77:       return code

Here you seem to be taking _all_ the bindings, but all you need to do it
pop off the one you just pushed.

# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | 6 passed    |     12 |
| extras         |             |      0 |
| Coding         |             |     15 |
| **TOTAL**      |             |     27 |


So, technically no tests ran, because you seem to have closed the
Interpreter class early, on line 40. I moved the closing brace down to
the bottom and tried again.

I also fixed the import statement at the top of the file (adding a .js`)

I then tried some simple expressions. It worked on plain numbers, but
`1+2` caused it to blow up.



# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All fail    |      0 |
| 00-test_extras | All fail    |      0 |
| Coding         |             |     18 |
| **TOTAL**      |             |     18 |

I couldn't get any tests to run.

I started to investigate.

     return new AST.Integer(parseInt(plusOrMinus, digits.join(""), 10))

but parseInt only takes one parameter for the number and one for the
radix: you're passing in two. I fixed that, and the first two tests
passed.

It then failed on "2+3". That was because of the following:

 = left:mult_term rest:(addop mult_term)*
    { return rest.reduce(
      (result, [op, _, right]) => new AST.BinOp(result, op, right),
      left
    )}

The code in parentheses in the first lne has two components (addop and
mult_term), but the parameter to reduce has three ([op, _, right]). The
middle of those is used to swallow any matching whitespace. So I added
whitespace to the production rule:

    = left:mult_term rest:(addop _ mult_term)*

and an additional 5 tests ran. I made the same fix to mult_term and
three more tests passed.

At this point I was maybe 20 minutes into the code and I stopped.

Gabi: I would have loved to help you with these things: all of them are
easily worked through, and you could have had a successful project. But
when you start on the evening it is due, then there's no time for that
kind of help.

Please start earlier, and please contact me to help when you need it.