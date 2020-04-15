export class BinOp
{
    constructor(Left, op, Right)
    {
        this.left = Left
        this.op = op
        this.right = Right
    }

    accept(visitor)
    {
        return visitor.visitBinOp(this)
    }
}

export class Integer
{
    constructor(value)
    {
        this.value = value
    }

    accept(visitor)
    {
        return visitor.visitInteger(this)
    }
}