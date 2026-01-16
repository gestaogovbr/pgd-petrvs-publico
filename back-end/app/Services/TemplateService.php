<?php

namespace App\Services;

use App\Exceptions\DataInvalidException;
use App\Exceptions\ServerException;
use App\Models\Documento;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Template;
use App\Services\ServiceBase;
use App\Services\TemplateDatasetService;
use Illuminate\Database\Eloquent\Collection;
use Exception;

function is_regex($expression) {
    $regex = "/^\/[\s\S]+\/$/";
    return preg_match($regex, $expression);
    //return @preg_match($expression, null) !== false;
}

class TemplateService extends ServiceBase
{
    public function proxyQuery($query, &$data)
    {
        if (!empty(array_filter($data["where"], fn ($v) => $v[0] == 'especie' && $v[2] == 'NOTIFICACAO'))) {
            $where = [];
            foreach ($data["where"] as $condition) {
                if (is_array($condition) && $condition[0] == "unidade_id") {
                    $unidade = Unidade::find($condition[2]);
                    $where[] = ["or", ["entidade_id", "==", $unidade?->entidade_id], $condition];
                } else {
                    $where[] = $condition;
                }
            }
            $data["where"] = $where;
        }
    }

    public function proxyExtra($rows, $data, $count)
    {
        $result = null;
        if (!empty(array_filter($data["where"], fn ($v) => $v[0] == 'especie' && $v[2] == 'NOTIFICACAO'))) {
            $result["notificacoes"] = [];
            $keys = array_keys($this->NotificacoesService->notificacoes);
            foreach ($keys as $key) {
                $value = $this->NotificacoesService->notificacoes[$key];
                $result["notificacoes"][] = [
                    "codigo" => $key,
                    "descricao" => $value["descricao"],
                    "dataset" => $value["dataset"],
                    "template" => $value["template"]
                ];
            }
            $config = config("notificacoes");
            $result["notifica_enviroment"] = [
                "petrvs" => $config["petrvs"]["enviar"],
                "email" => $config["email"]["enviar"],
                "whatsapp" => $config["whatsapp"]["enviar"]
            ];
        }
        return $result;
    }

    public function loadDataset($especie, $codigo) {
        $key = $especie . (empty($codigo) ? '' : '#' . $codigo);
        return $this->templateDatasetService->getFullDataset($key);
    }

    /**************************************************************************************
     * Funções para renderizar template
     **************************************************************************************/

    public const OPEN_TAG = "{{";
    public const CLOSE_TAG = "}}";
    public const EXPRESSION_BOOLEAN = '/^(true|false)$/';
    public const EXPRESSION_NUMBER = '/^[0-9,\.]+$/';
    public const EXPRESSION_STRING = '/^".*"$/';
    public const EXPRESSION_VAR = '/^[a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*$/';
    public const EXPRESSION_IF = '/^if:(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(\s*)(=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(;.+?\=.+?)*$/';
    public const EXPRESSION_FOR = '/^for:([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*)\[((\d+\.\.[a-zA-Z]\w*?(\.\.[a-zA-Z]\w*?)?)|(([a-zA-Z]\w*?\.\.)?[a-zA-Z]\w*?\.\.\d+)|([a-zA-Z]\w*?))\](;.+?\=.+?)*$/';
    public const STATEMENT_FOR = '/^for:(?<EXP>([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*))\[(((?<START>\w+?)\.\.(?<INDEX>\w*?)(\.\.(?<END>\w+?))?)|(?<EACH>\w+?))\](?<PARS>(;.+?\=.+?)*)$/';
    public const STATEMENT_IF = '/^if:(?<EXP_A>.+?)(\s*)(?<OPER>=|==|\>|\>=|\<|\<=|\<\>|\!=)(\s*)(?<EXP_B>.+?)(?<PARS>(;.+?\=.+?)*)$/';
    public const STATEMENT_FOR_WITHOUT_PARS = '/^(?<STATMENT>for:\w+\[.+\])/';
    public const PARAMETER_DROP = "drop";      

    function getStrRegEx($expression)
    {
        return empty($expression) ? "" : (!is_regex($expression) ?
            implode("", array_map(fn ($c) => str_contains("<>/\\{}[]()-?*.!~", $c) ? "\\" . $c : $c, str_split($expression))) : 
            preg_replace(['/^\//', '/\/.*?$/'], '', $expression));
    }

    /* Monta as RegExp start e end de modo a obter: /^(BEFORE)(START)(TAG)(END)(AFTER)$/ */
    function tagSplit($template, $startTag, $endTag)
    {
        $beforeAfterRegEx = fn ($tag) => "/^(?<BEFORE>[\\s\\S]*?)(?<START>" . $this->getStrRegEx(@$tag['before']) . "[\\s\\t\\n]*)(?<TAG>" . $this->getStrRegEx(@$tag['tag']) . ")(?<END>[\\s\\t\\n]*" . $this->getStrRegEx(@$tag['after']) . ")(?<AFTER>[\\s\\S]*?)$/";
        $startRegEx = $beforeAfterRegEx(is_string($startTag) ? ['tag' => $startTag] : $startTag);
        $endRegEx = $beforeAfterRegEx(is_string($endTag) ? ['tag' => $endTag] : $endTag);
        preg_match($startRegEx, $template, $start);
        if (!empty($start)) {
            preg_match($endRegEx, $start['AFTER'], $end);
            if (!empty($end)) {
                return [
                    'before' => $start['BEFORE'],
                    'start' => ['before' => $start['START'], 'tag' => $start['TAG'], 'after' => $start['END']],
                    'content' => $end['BEFORE'],
                    'end' => ['before' => $end['START'], 'tag' => $end['TAG'], 'after' => $end['END']],
                    'after' => $end['AFTER']
                ];
            }
        }
        return null;
    }

    function getExpressionValue($expression, $context) {
        $expression = str_replace("[+]", ".length", $expression);
        preg_match_all('/\[\w+\]/', $expression, $matches);
        if (!empty($matches[0])) {
            foreach ($matches[0] as $x) {
                $nestedExpression = preg_replace('/^\[/', '', $x);
                $nestedExpression = preg_replace('/\]$/', '', $nestedExpression);
                $nestedValue = $this->getExpressionValue($nestedExpression, $context);
                $expression = str_replace("[" . $x . "]", "[" . $nestedValue . "]", $expression);
            }
        }
        if (strtolower($expression) === "true" && preg_match(TemplateService::EXPRESSION_BOOLEAN, $expression)) return true;
        if (preg_match(TemplateService::EXPRESSION_STRING, $expression)) return preg_replace(['/^\"/', '/\"$/'], '', $expression);
        if (preg_match(TemplateService::EXPRESSION_NUMBER, $expression)) return +$expression;
        if (preg_match(TemplateService::EXPRESSION_VAR, $expression)) return UtilService::getNested($context, $expression);
        return null;
    }

    function bondaryTag(&$tag, $regStrBefore, $regStrAfter) {
        preg_match("/(?<BEFORE>[\\s\\S]*)(?<CONTENT>$regStrBefore)/", $tag['before'], $start);
        preg_match("/(?<CONTENT>$regStrAfter)(?<AFTER>[\\s\\S]*)/", $tag['after'], $end);
        $tag['start']['before'] = $start['CONTENT'] ?? "";
        $tag['before'] = $start['BEFORE'] ?? "";
        $tag['after'] = $end['AFTER'] ?? "";
        $tag['end']['after'] = $end['CONTENT'] ?? "";
    }

    function evaluateOperator($a, $operator, $b) {
        switch ($operator) {
            case "==":
            case "=": return $a == $b;
            case "<>":
            case "!=": return $a != $b;
            case ">": return $a > $b;
            case ">=": return $a >= $b;
            case "<": return $a < $b;
            case "<=": return $a <= $b;
        }
        return false;
    }

    function splitEndTag(&$after, $startTag, $endTag) {
        $before = "";
        $level = 1;
        $next = null;
        while ($next = $this->tagSplit($after, ['tag' => "/" . $this->getStrRegEx(TemplateService::OPEN_TAG) . "((" . $startTag . ")|(" . $endTag . "))/"], TemplateService::CLOSE_TAG)) {
            $level += strpos($next['start']['tag'], $endTag) !== false ? -1 : 1;
            if (!$level) { /* Level = 0; significa que o end-for é do respectivo for */
                $next['before'] = $before . $next['before'];
                return $next;
            }
            $after = $next['after'];
            $before .= $next['before'] . $next['start']['tag'] . $next['content'] . $next['end']['tag'];
        }
        return null;
    }

    function processParamDrop(&$tag, $params) {
        $parameter = []; /* Usado penas para iterar os parametros */
        $parameters = array_reduce(
            array_map(fn($v) => $parameter = explode("=", $v, 2), array_filter(explode(";", ltrim($params, ";")))),
            function ($a, $v) {
                $a[$v[0]] = $v[1];
                return $a;
            },
            []
        );
        if ($tag && isset($parameters['drop']) && preg_match('/^\w+$/', $parameters['drop'])) {
            $this->bondaryTag($tag, '<' . $parameters['drop'] . '>[\\s\\S]*?$', '^[\\s\\S]*?<\\/' . $parameters['drop'] . '>');
            $tag['start']['before'] = "";
            $tag['end']['after'] = "";
        }
    }

    /**
     * Renderiza o template utilizando os dados do contexto (Recursivo)
     * @param string $template
     * @param array $context
     */
    function renderTemplate($template, $context) {
        $tag = null;
        $statement = null;
        $next = $template;
        $result = "";
        $context = (array) $context ?? [];
    
        while ($tag = $this->tagSplit($next, TemplateService::OPEN_TAG, TemplateService::CLOSE_TAG)) {
            try {
                if (preg_match(TemplateService::EXPRESSION_VAR, $tag['content'])) {
                    $content = ($this->getExpressionValue($tag['content'], $context) . "") . "";
                    $tag['content'] = $this->renderTemplate($content, $context);
                } elseif (preg_match(TemplateService::EXPRESSION_IF, $tag['content'])) {
                    preg_match(TemplateService::STATEMENT_IF, $tag['content'], $statement); /* if:OPER1=OPER2;par=0;par=0... */
                    $aValue = $this->getExpressionValue($statement['EXP_A'] ?? "", $context);
                    $bValue = $this->getExpressionValue($statement['EXP_B'] ?? "", $context);
                    $ifThen = $this->evaluateOperator($aValue, $statement['OPER'] ?? "", $bValue);
                    /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                    $this->processParamDrop($tag, $statement['PARS'] ?? "");
                    /* Encontra o end-if */
                    $endIfTag = $this->splitEndTag($tag['after'], "if:", "end-if");
                    if ($endIfTag) {
                        /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                        $this->processParamDrop($endIfTag, ltrim($endIfTag['content'] ?? "", ";"));
                        /* O content da tag só será renderizado caso ifThen seja true */
                        $tag['content'] = $ifThen ? $this->renderTemplate($endIfTag['before'], $context) : "";
                        $tag['after'] = $endIfTag['after'];
                    } else {
                        throw new DataInvalidException("o if não possui um respectivo end-if");
                    }
                } elseif (preg_match(TemplateService::EXPRESSION_FOR, $tag['content'])) {
                    preg_match(TemplateService::STATEMENT_FOR, $tag['content'], $statement); /* for:EXP[(t..)x..0|0..x(..t)|EACH];par=0;par=0... */
                    /* Processa o parametro drop caso ele exista, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */
                    $this->processParamDrop($tag, $statement['PARS'] ?? "");
                    /* Encontra o end-for */
                    $endForTag = $this->splitEndTag($tag['after'], "for:", "end-for");
                    if ($endForTag) {
                        /* Processa o parametro drop caso ele exista na tag de fechamento, removendo a HTML-tag (definida pelo drop=TAG) onde o comando está dentro */                        
                        $this->processParamDrop($endForTag, ltrim($endForTag['content'] ?? "", ";"));
                        /* O content da tag será todo o conteúdo repetível do for e o after será o after do end-for */
                        $tag['content'] = "";
                        $tag['after'] = $endForTag['after'];
                        /* Verifica se a variável de iteração já existe no contexto */
                        if (isset($context[$statement['EACH'] ?? $statement['INDEX'] ?? ""])) throw new DataInvalidException("Variável de contexto já existe no contexto atual");
                        /* Itera os elementos do for */
                        $elements = (array) $this->getExpressionValue($statement['EXP'] ?? "", $context);
                        $each = preg_match('/^[a-zA-Z]\w+$/', $statement['EACH'] ?? "");
                        $asc = $each || preg_match('/^\d+$/', $statement['START'] ?? "");
                        $startFor = $each ? 0 : ($asc ? (int)$statement['START'] : count($elements));
                        $endFor = $each ? count($elements) : ($asc ? count($elements) : (int)$statement['END']);
                        for ($index = $startFor; $asc ? $index < $endFor : $index > $endFor; $asc ? $index++ : $index--) {
                            $current = $elements[$index];
                            $forContext = array_merge([], $context);
                            /* Alimenta contexto com variaveis do for */
                            if ($each) {
                                $forContext[$statement['EACH']] = $current;
                            } else {
                                $total = $asc && isset($statement['END']) ? $statement['END'] : (!$asc && isset($statement['START']) ? $statement['START'] : null);
                                if ($total) $forContext[$total] = count($elements);
                                $forContext[$statement['INDEX']] = $index;
                            }
                            $tag['content'] .= $this->renderTemplate($endForTag['before'], $forContext);
                        }
                    } else {
                        throw new DataInvalidException("o for não possui um respectivo end-for");
                    }
                }
            } catch (Exception $error) {
                $tag['content'] = "(ERRO)";
            } finally {
                $tag['start']['tag'] = "";
                $tag['end']['tag'] = "";
            }
            /* Incrementa o result e prepara o next */
            $result .= $tag['before'] . ($tag['start']['before'] ?? "") . $tag['start']['tag'] . ($tag['start']['after'] ?? "") . $tag['content'] . ($tag['end']['before'] ?? "") . $tag['end']['tag'] . ($tag['end']['after'] ?? "");
            $next = $tag['after'];
        }
        $result .= $next;
    
        return $result;
    }

    public function gerarRelatorio($data) {
        $template = Template::where("entidade_id", $data['entidade'])->where("codigo", $data['codigo'])->first();
        $datasource = $this->getDatasource("REPORT#" . $data['codigo'], $data['params']);
        if($datasource != null && $template != null) {

            $documento = new Documento([
                'titulo' => $template->titulo,
                'conteudo' => $this->renderTemplate($template->conteudo, $datasource),
                'template' => $template->conteudo,
                'dataset' => $template->dataset,
                'datasource' => $datasource,
                'template_id' => $template->id,
                'tipo' => 'REPORT',
                'especie' => 'RELATORIO',
                'entidade_id' => $data['entidade']
            ]);
            $documento->save();
            return $documento;
        } else {
            throw new ServerException('Erro na geração do relatório');
        }
    }
    
    public function getFields($fields) {
        return gettype($fields) == "string" ? $this->getFields($this->templateDatasetService->getDataset($fields)["fields"]) : $fields;
    }
    
    public function getDatasource($codigo, $params) {
        $context = $this->templateDatasetService->getDataset($codigo)["context"]($params);
        $result = null;
        if(is_array($context) || ($context instanceof Collection)) {
            $result = [];
            foreach($context as $row) $result[] = $this->buildFields($row, $this->getFields($this->templateDatasetService->getDataset($codigo)["fields"]));
        } else if ($context != null) {
            $result = $this->buildFields($context, $this->getFields($this->templateDatasetService->getDataset($codigo)["fields"]));
        }
        return $result;
    }
    
    public function buildFields($context, $fields) {
        $result = [];
        $values = $context instanceof ModelBase || (is_object($context) ? (get_class($context) == "App\Models\Usuario") : false) ? $context->toArray() : (array) $context;
        foreach($fields as $field) {
            $valor = array_key_exists("value", $field) ? $field["value"]($context) : (array_key_exists($field["field"], $values) ? $values[$field["field"]] : null);
            if(is_array($valor) || ($valor instanceof Collection)) {
                $list = [];
                $items = $valor ?? [];
                foreach($items as $item){
                    $list[] = $this->buildFields($item, $this->getFields($field["fields"]));
                }
                $result[$field["field"]] = $list;
            } else if ($valor !== null) {
                if(array_key_exists("fields", $field)) { // Objecto
                    $result[$field["field"]] = (Object) $this->buildFields($valor, $this->getFields($field["fields"]));
                } else {
                    $valor = array_key_exists("lookup", $field) ? $this->formataLookup($valor, $field["lookup"]) : $valor;
                    $result[$field["field"]] = array_key_exists("type", $field) ? $this->formataValor($valor, $field["type"]) : $valor;
                }
            }
        }
        return (Object) $result;
    }

    public function formataValor($valor, $tipo){
        if(!empty($tipo)){
           switch ($tipo) {
            case 'DATE': return UtilService::getDateFormatted($valor);           
            case 'DATETIME': return UtilService::getDateTimeFormatted($valor);           
            case 'TIME': return UtilService::getTimeFormatted($valor);           
            default: return $valor;
           }
        }
    }

    public function formataLookup($valor, $lookup){
        $lookups = $this->lookupService::LOOKUPS[$lookup];
        return $this->lookupService::getValue($lookups, $valor);
    }    

}
