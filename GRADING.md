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