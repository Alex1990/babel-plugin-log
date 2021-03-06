function isConsoleLogCall (path) {
  const { callee } = path.node
  const {
    type,
    object,
    property
  } = callee
  return type === 'MemberExpression' &&
    (object.type === 'Identifier' && object.name === 'console') &&
    (property.type === 'Identifier' && property.name === 'log')
}

function getExpressionLiteral (expression, path) {
  const {
    start,
    end
  } = expression
  return path.hub.file.code.slice(start, end)
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression (path) {
        if (!isConsoleLogCall(path)) return

        path.shouldSkip = true

        const args = path.node.arguments
        const newArgs = []

        args.forEach((arg, index) => {
          const label = getExpressionLiteral(arg, path)
          if (t.isLiteral(arg)) {
            if (t.isStringLiteral(arg)) {
              newArgs.push(t.stringLiteral(arg.value))
            } else {
              newArgs.push(arg)
            }
            return
          }
          newArgs.push(t.stringLiteral(label), arg)
        })

        path.node.arguments = newArgs
      }
    }
  }
}
