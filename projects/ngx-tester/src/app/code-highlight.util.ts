export interface CodeToken {
  text: string;
  className: "tag" | "attr" | "str" | "keyword" | "plain";
}

const TOKEN_RE =
  /(<\/?[a-zA-Z-]+|\/?>)|(\[?[a-zA-Z]+\]?)(?==)|("[^"]*"|'[^']*')|(\b(?:import|from|constructor|private|setTimeout|return)\b)/g;

/** Splits generated code into styleable tokens for the code panel's syntax highlighting. */
export function tokenize(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const push = (text: string, className: CodeToken["className"]) => {
    if (text) {
      tokens.push({ text, className });
    }
  };

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(code))) {
    push(code.slice(lastIndex, match.index), "plain");
    if (match[1]) {
      push(match[1], "tag");
    } else if (match[2]) {
      push(match[2], "attr");
    } else if (match[3]) {
      push(match[3], "str");
    } else {
      push(match[4], "keyword");
    }
    lastIndex = TOKEN_RE.lastIndex;
  }
  push(code.slice(lastIndex), "plain");

  return tokens;
}
