import * as Lint from 'tslint'
import * as ts from 'typescript'

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = 'if statement blocks must be no more than one line long'

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
      return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
    }
}

class Walk extends Lint.RuleWalker {
  protected visitIfStatement(node: ts.IfStatement) {
    let lines = [ ...node.getText().split('\n') ]
    lines.pop()
    lines.shift()
    if (lines.length > 1) {
      this.addFailureAt(node.getStart(), node.getEnd() - node.getStart(), Rule.FAILURE_STRING)
    }
    super.visitIfStatement(node)
  }
}
