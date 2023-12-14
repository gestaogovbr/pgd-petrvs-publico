<?php

/*
As classes e funções abaixo processam a linguagem de templates utilizando a seguinte gramática:

<TEMPLATE>   ::= (<TEXT>|<TAG>)+
<TEXT>       ::= .*
<INDEX>      ::= [0-9]+
<IDENTIFIER> ::= [a-zA-Z_](a-zA-Z0-9_)*
<LITERAL>    ::= true|false|[0-9]+(\.[0-9]*)?|".*"|'.*'
<VAR>        ::= <IDENTIFIER>(\.<VAR> | "["<INDEX>"]")*
<TAG>        ::= {{<STATEMENT>}}
<STATEMENT>  ::= <IF> | <END-IF> | <FOR> | <END-FOR> | <VAR>
<IF>         ::= if:<EXPRESSION>(;<PARAM>)*
<END-IF>     ::= end-if
<FOR>        ::= for:<IDENTIFIER>"["(<INDEX>..<IDENTIFIER>(..<IDENTIFIER>)? | <IDENTIFIER>)"]"(;<PARAM>)*
<END-FOR>    ::= end-for
<EXPRESSION> ::= (<LITERAL>|<VAR>)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(<LITERAL>|<VAR>)
<PARAM>     ::= <IDENTIFIER>=<LITERAL>
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
class Token {
    const TEXT = ".*";
    const INDEX = "[0-9]+";
    const IDENTIFIER = "I";
    const TRUE = "true";
    const FALSE = "false";
    const NUMBER = "[0-9]+(\.[0-9]*)?";
    const STRING = "'.*'";
    const DOT = ".";
    const OPEN_TAG = "{{";
    const CLOSE_TAG = "}}";
    const OPEN_BRACKET = "[";
    const CLOSE_BRACKET = "[";
    const IF = "if:";
    const END_IF = "end-if";
    const FOR = "for:";
    const END_FOR = "end-for";
    const SEMICOLON = ";";
    const OPERATOR = "=|==|\>|\>=|\<|\<=|\<\>|\!=";
    const EOF = "$";
    
    public $kind = null;
    public $start = 0;
    public $end = 0;

    public function __construct($kind, $start, $end) {
        $this->kind = $kind;
        $this->start = $start;
        $this->end = $end;
    }
}

class Scanner {
    public $source = "";
    public $cursor = 0;
    public $start = 0;
    public $eof = false;

    public function getCurrentChar() {
        return substr($this->source, $this->cursos, 1);
    }

    public function take($expectedChar) {
        
    }

    public function takeIt() {
        if($this->cursor + 1 > strlen($this->source)) {
            $this->eof = true;
            return null;
        } else {
            $this->cursor++;
            return $this->getCurrentChar();
        }
    }
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