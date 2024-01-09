<?php

/*
As classes e funções abaixo processam a linguagem de templates utilizando a seguinte Gramática Sintática:

<TEMPLATE>   ::= (<TEXT>|<TAG>)*
<TEXT>       ::= .*?({{|$)
<INDEX>      ::= [0-9]+
<IDENTIFIER> ::= [a-zA-Z_](a-zA-Z0-9_)*
<LITERAL>    ::= true|false|<INDEX>|[0-9]+\.[0-9]+|".*"|'.*'
<VAR>        ::= <IDENTIFIER>(\.<VAR> | "["<INDEX>"]")*
<TAG>        ::= {{<STATEMENT>}}
<STATEMENT>  ::= <IF> | <END-IF> | <FOR> | <END-FOR> | <VAR>
<IF>         ::= if:<EXPRESSION>(;<PARAM>)*
<END-IF>     ::= end-if
<FOR>        ::= for:<IDENTIFIER>"["(<INDEX>..<IDENTIFIER>(..<IDENTIFIER>)? | <IDENTIFIER>)"]"(;<PARAM>)*
<END-FOR>    ::= end-for
<EXPRESSION> ::= (<LITERAL>|<VAR>)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(<LITERAL>|<VAR>)
<PARAM>     ::= <IDENTIFIER>=<LITERAL>

Gramática Lexica:
<TEXT>         ::= .*?({{|$)
<INDEX>        ::= [0-9]+
<IDENTIFIER>   ::= [a-zA-Z_](a-zA-Z0-9_)*
<LITERAL>      ::= true|false|[0-9]+(\.[0-9]*)?|".*"|'.*'
<TAG>          ::= {{ | }}
<BRACKET>      ::= []
<IF>           ::= if:
<END-IF>       ::= end-if
<FOR>          ::= for:
<END-FOR>      ::= end-for
<OPERATOR>     ::= =|==|\>|\>=|\<|\<=|\<\>|\!=

*/

#region Interface Visitor que deverá ser implementado pelo Parser e pelo Builder
interface Visitor {
    public function visitTemplate($template);
    public function visitTexto($text);
    public function visitIndex($index);
    public function visitIdentifier($identifier);
    public function visitLiteral($literal);
    public function visitVar($var);
    public function visitTag($tag);
    public function visitStatment($statment);
    public function visitIf($if);
    public function visitEndIf($endIf);
    public function visitFor($for);
    public function visitEndFor($endFor);
    public function visitExpression($expression);
    public function visitParam($param);
}
#endregion

#region Nós da AST (Árvore sintática)
interface Node {
    public function visit(Visitor $visitor);
}

// <TEMPLATE> ::= (<TEXT>|<TAG>)+
class NodeTemplate implements Node {
    public $textsTags = []; /* (NodeText | NodeTag)[] */
    public function visit($visitor) {
        $visitor->visitTemplate($this);
    }
}

// <TEXT> ::= .*
class NodeText implements Node {
    public $text = ""; /* string */
    public function visit($visitor) {
        $visitor->visitText($this);
    }
}

// <INDEX> ::= [0-9]+
class NodeIndex implements Node {
    public $index = 0; /* int */
    public function visit($visitor) {
        $visitor->visitIndex($this);
    }
}

// <IDENTIFIER> ::= [a-zA-Z_](a-zA-Z0-9_)*
class NodeIdentifier implements Node {
    public $identifier = ""; /* string */
    public function visit($visitor) {
        $visitor->visitIndentifier($this);
    }
}

// <LITERAL> ::= true|false|[0-9]+("."[0-9])?|".*"|'.*'
class NodeLiteral implements Node {
    public $literal; /* int | double | string | boolean */
    public function visit($visitor) {
        $visitor->visitLiteral($this);
    }
}

// <VAR> ::= <IDENTIFIER>(.<VAR> | "["<INDEX>"]")*
class NodeVar implements Node {
    public $identifier = null; /* NodeIdentifier */
    public $neasted = []; /* (NodeVar | NodeIndex)[] */
    public function visit($visitor) {
        $visitor->visitVar($this);
    }
}

// <TAG> ::= {{<STATEMENT>}}
class NodeTag implements Node {
    public $statement = null; /* NodeStatement */
    public function visit($visitor) {
        $visitor->visitTag($this);
    }
}

// <STATEMENT> ::= <IF> | <END-IF> | <FOR> | <END-FOR> | <VAR>
class NodeStatement implements Node {
    public $statement = null; /* NodeIf | NodeEndIf | NodeFor | NodeEndFor | NodeVar */
    public function visit($visitor) {
        $visitor->visitStatment($this);
    }
}

// <IF> ::= if:<EXPRESSION>(;<PARAM>)*
class NodeIf implements Node {
    public $expression = null; /* NodeExpression */
    public $params = []; /* NodeParam[] */
    public function visit($visitor) {
        $visitor->visitIf($this);
    }
}

// <END-IF> ::= end-if
class NodeEndIf implements Node {
    public function visit($visitor) {
        $visitor->visitEndIf($this);
    }
}

// <FOR> ::= for:<IDENTIFIER>"["(<INDEX>..<IDENTIFIER>(..<IDENTIFIER>)? | <IDENTIFIER>)"]"(;<PARAM>)*
class NodeFor implements Node {
    public $identifier = null; /* NodeIdentifier */
    public $start = null; /* NodeIndex */
    public $current = null; /* NodeIdentifier */
    public $lenght = null; /* NodeIdentifier */
    public $params = []; /* NodeParam[] */
    public function visit($visitor) {
        $visitor->visitFor($this);
    }
}

// <END-FOR> ::= end-for
class NodeEndFor implements Node {
    public function visit($visitor) {
        $visitor->visitEndFor($this);
    }
}

// <EXPRESSION> ::= (<LITERAL>|<VAR>)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(<LITERAL>|<VAR>)
class NodeExpression implements Node {
    public $first = null; /* NodeLiteral | NodeVar */
    public $operator = null; /* string */
    public $second = null; /* NodeLiteral | NodeVar */
    public function visit($visitor) {
        $visitor->visitExpression($this);
    }
}

// <PARAM> ::= <IDENTIFIER>=<LITERAL>
class NodeParam implements Node {
    public $identifier = null; /* NodeIdentifier */
    public $literal = null; /* NodeLiteral */
    public function visit($visitor) {
        $visitor->visitParam($this);
    }
}
#endregion

#region Léxico
enum TokenKind
{
    case TEXT;
    case TAG;
    case BRACKET;
    case IF;
    case END_IF;
    case FOR;
    case END_FOR;
    case SEMICOLON;
    case OPERATOR;
    case EOF;
}

class Token {
    public $kind = null;
    public $value = "";

    public function __construct($kind, $value) {
        $this->kind = $kind;
        $this->value = $value;
    }
}

class Scanner {
    public $source = "";
    public $cursor = 0;
    public $start = 0;
    public $eof = false;

    function __construct($source = "") {
        $this->setSource($source);
    }

    public function setSource($source) {
        $this->source = $source;
        $this->start = 0;
        $this->cursor = 0;
        $this->eof = empty($source);
    }

    public function getCurrent($lenght = 1) {
        return substr($this->source, $this->cursor, $lenght);
    }

    public function lookahead($expected) {
        return $expected == substr($this->source, $this->cursor, strlen($expected));
    }

    public function getCurrentSppeling() {
        return substr($this->source, $this->start, $this->cursor - $this->start);
    }

    public function take($expected) {
        if($expected == $this->lookahead($expected)) {
            return $this->takeIt(strlen($expected));
        } else {
            return null;
        }
    }

    public function takeIt($lenght = 1) {
        $result = null;
        if (!$this->eof) {
            $result = $this->getCurrent($lenght);
            $this->cursor = min($this->cursor + $lenght, strlen($this->source));
            $this->eof = $this->cursor >= strlen($this->source);
        }
        return $result;
    }

    public function tryTakeToken($kind, $expecteds) {
        foreach($expecteds as $expected) {
            if($this->lookahead($expected)) {
                return new Token($kind, $this->take($expected));
            }
        }
        return null;
    }

    public function tryTakePattern($kind, $pattern) {
        if(preg_match($pattern, $this->getCurrent(null), $matches)) {
            return $this->take($matches[0]);
        }
        return null;
    }

    public function scanText() {
        while(!$this->eof && !$this->lookahead("{{")) {
            $this->takeIt();
        }
        $buffer = $this->getCurrentSppeling();
        return empty($buffer) ? null : new Token(TokenKind::TEXT, $buffer);
    }

    public function scanIndex() {
        while(!$this->eof && preg_match("/[0-9]/", $this->getCurrent())) {
            $this->takeIt();
        }
        $buffer = $this->getCurrentSppeling();
        return empty($buffer) ? null : new Token(TokenKind::INDEX, $buffer);
    }

    public function scanIdentifier() {
        while(!$this->eof && preg_match("/[0-9]/", $this->getCurrent())) {
            $this->takeIt();
        }
        $buffer = $this->getCurrentSppeling();
        return empty($buffer) ? null : new Token(TokenKind::INDEX, $buffer);
    }
    /*
    <IDENTIFIER>   ::= [a-zA-Z_](a-zA-Z0-9_)*
    <LITERAL>      ::= true|false|[0-9]+(\.[0-9]*)?|".*"|'.*'
    */

    /*
    public function scanToken() {
        $result = null;
        if(!$this->eof) {
            $result = $this->tryTakeToken(TokenKind::TAG, ["{{", "}}"]) ??
                $this->tryTakeToken(TokenKind::BRACKET, ["[", "]"]) ??
                $this->tryTakeToken(TokenKind::IF, ["if:"]) ??
                $this->tryTakeToken(TokenKind::END_IF, ["end-if:"]) ??
                $this->tryTakeToken(TokenKind::IF, ["for:"]) ??
                $this->tryTakeToken(TokenKind::END_IF, ["end-for:"]) ??
                $this->tryTakeToken(TokenKind::OPERATOR, ["==", ">=", "<=", "!=", "<>", "=", ">", "<"]) ??
        }
        return new Token(TokenKind::TEXT, $this->getCurrentSppeling());
    }
    */
}
#endregion

#region Sintático
class Parser implements Visitor {

}
#endregion

#region Montador
class Builder implements Visitor {

}

#endregion
