<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR;

use App\Exceptions\DataInvalidException;
use App\Services\LookupService;
use App\Services\UtilService;
use Exception;

class TCRTemplateRenderer
{
    private const OPEN_TAG = '{{';
    private const CLOSE_TAG = '}}';
    private const EXPRESSION_BOOLEAN = '/^(true|false)$/';
    private const EXPRESSION_NUMBER = '/^[0-9,\.]+$/';
    private const EXPRESSION_STRING = '/^".*"$/';
    private const EXPRESSION_VAR = '/^[a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*$/';
    private const EXPRESSION_IF = '/^if:(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(\\s*)(=|==|\\>|\\>=|\\<|\\<=|\\<\\>|\\!=)(\\s*)(".*"|true|false|([0-9,\.]+)|([a-zA-z]\w*?((\.\w+?)|(\[\+\])|(\[(\d+?|[a-zA-z]\w*?)\]))*))(;.+?\\=.+?)*$/';
    private const EXPRESSION_FOR = '/^for:([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\]))*)\\[((\\d+\\.\\.[a-zA-Z]\\w*?(\\.\\.[a-zA-Z]\\w*?)?)|(([a-zA-Z]\\w*?\\.\\.)? [a-zA-Z]\\w*?\\.\\.\\d+)|([a-zA-Z]\\w*?))\\](;.+?\\=.+?)*$/';
    private const STATEMENT_FOR = '/^for:(?<EXP>([a-zA-z]\w*?((\.\w+?)|(\[(\d+?|[a-zA-z]\w*?)\\]))*))\\[(((?<START>\\w+?)\\.\\. (?<INDEX>\\w*?)(\\.\\. (?<END>\\w+?))?)|(?<EACH>\\w+?))\\](?<PARS>(;.+?\\=.+?)*)$/';
    private const STATEMENT_IF = '/^if:(?<EXP_A>.+?)(\\s*)(?<OPER>=|==|\\>|\\>=|\\<|\\<=|\\<\\>|\\!=)(\\s*)(?<EXP_B>.+?)(?<PARS>(;.+?\\=.+?)*)$/';
    private const PARAMETER_DROP = 'drop';

    public function render(string $template, mixed $datasource): string
    {
        return $this->renderTemplate($template, (array) $datasource ?? []);
    }

    private function renderTemplate(string $template, mixed $context): string
    {
        $next = $template;
        $result = '';
        $context = (array) $context ?? [];

        while ($tag = $this->tagSplit($next, self::OPEN_TAG, self::CLOSE_TAG)) {
            try {
                if (preg_match(self::EXPRESSION_VAR, $tag['content'])) {
                    $content = ($this->getExpressionValue($tag['content'], $context) . '') . '';
                    $tag['content'] = $this->renderTemplate($content, $context);
                } elseif (preg_match(self::EXPRESSION_IF, $tag['content'])) {
                    $this->processIf($tag, $context);
                } elseif (preg_match(self::EXPRESSION_FOR, $tag['content'])) {
                    $this->processFor($tag, $context);
                }
            } catch (Exception $error) {
                $tag['content'] = '(ERRO)';
            } finally {
                $tag['start']['tag'] = '';
                $tag['end']['tag'] = '';
            }

            $result .= $tag['before']
                . ($tag['start']['before'] ?? '')
                . $tag['start']['tag']
                . ($tag['start']['after'] ?? '')
                . $tag['content']
                . ($tag['end']['before'] ?? '')
                . $tag['end']['tag']
                . ($tag['end']['after'] ?? '');
            $next = $tag['after'];
        }

        return $result . $next;
    }

    private function processIf(array &$tag, array $context): void
    {
        preg_match(self::STATEMENT_IF, $tag['content'], $statement);
        $aValue = $this->getExpressionValue($statement['EXP_A'] ?? '', $context);
        $bValue = $this->getExpressionValue($statement['EXP_B'] ?? '', $context);
        $ifThen = $this->evaluateOperator($aValue, $statement['OPER'] ?? '', $bValue);

        $this->processParamDrop($tag, $statement['PARS'] ?? '');

        $endIfTag = $this->splitEndTag($tag['after'], 'if:', 'end-if');
        if (!$endIfTag) {
            throw new DataInvalidException('o if não possui um respectivo end-if');
        }

        $this->processParamDrop($endIfTag, ltrim($endIfTag['content'] ?? '', ';'));
        $tag['content'] = $ifThen ? $this->renderTemplate($endIfTag['before'], $context) : '';
        $tag['after'] = $endIfTag['after'];
    }

    private function processFor(array &$tag, array $context): void
    {
        preg_match(self::STATEMENT_FOR, $tag['content'], $statement);
        $this->processParamDrop($tag, $statement['PARS'] ?? '');

        $endForTag = $this->splitEndTag($tag['after'], 'for:', 'end-for');
        if (!$endForTag) {
            throw new DataInvalidException('o for não possui um respectivo end-for');
        }

        $this->processParamDrop($endForTag, ltrim($endForTag['content'] ?? '', ';'));
        $tag['content'] = '';
        $tag['after'] = $endForTag['after'];

        if (isset($context[$statement['EACH'] ?? $statement['INDEX'] ?? ''])) {
            throw new DataInvalidException('Variável de contexto já existe no contexto atual');
        }

        $elements = (array) $this->getExpressionValue($statement['EXP'] ?? '', $context);
        $each = preg_match('/^[a-zA-Z]\w+$/', $statement['EACH'] ?? '');
        $asc = $each || preg_match('/^\d+$/', $statement['START'] ?? '');
        $startFor = $each ? 0 : ($asc ? (int) $statement['START'] : count($elements));
        $endFor = $each ? count($elements) : ($asc ? count($elements) : (int) $statement['END']);

        for ($index = $startFor; $asc ? $index < $endFor : $index > $endFor; $asc ? $index++ : $index--) {
            $forContext = array_merge([], $context);
            if ($each) {
                $forContext[$statement['EACH']] = $elements[$index];
            } else {
                $total = $asc && isset($statement['END']) ? $statement['END'] : (!$asc && isset($statement['START']) ? $statement['START'] : null);
                if ($total) {
                    $forContext[$total] = count($elements);
                }
                $forContext[$statement['INDEX']] = $index;
            }
            $tag['content'] .= $this->renderTemplate($endForTag['before'], $forContext);
        }
    }

    private function getExpressionValue(string $expression, array $context): mixed
    {
        $expression = str_replace('[+]', '.length', $expression);
        preg_match_all('/\[\w+\]/', $expression, $matches);
        if (!empty($matches[0])) {
            foreach ($matches[0] as $x) {
                $nested = preg_replace(['/^\[/', '/\]$/'], '', $x);
                $nestedValue = $this->getExpressionValue($nested, $context);
                $expression = str_replace('[' . $x . ']', '[' . $nestedValue . ']', $expression);
            }
        }

        if (strtolower($expression) === 'true' && preg_match(self::EXPRESSION_BOOLEAN, $expression)) {
            return true;
        }
        if (preg_match(self::EXPRESSION_STRING, $expression)) {
            return preg_replace(['/^\"/', '/\"$/'], '', $expression);
        }
        if (preg_match(self::EXPRESSION_NUMBER, $expression)) {
            return (float) $expression;
        }
        if (preg_match(self::EXPRESSION_VAR, $expression)) {
            return UtilService::getNested($context, $expression);
        }

        return null;
    }

    private function evaluateOperator(mixed $a, string $operator, mixed $b): bool
    {
        return match ($operator) {
            '==', '=' => $a == $b,
            '<>', '!=' => $a != $b,
            '>' => $a > $b,
            '>=' => $a >= $b,
            '<' => $a < $b,
            '<=' => $a <= $b,
            default => false,
        };
    }

    private function getStrRegEx(string $expression): string
    {
        if (empty($expression)) {
            return '';
        }

        $isRegex = @preg_match("/^\/[\s\S]+\/$/", $expression);
        if ($isRegex) {
            return preg_replace(['/^\//', '/\/.*?$/'], '', $expression);
        }

        return implode('', array_map(
            fn ($c) => str_contains('<>/\\{}[]()-?*.!~', $c) ? '\\' . $c : $c,
            str_split($expression)
        ));
    }

    private function tagSplit(string $template, string|array $startTag, string|array $endTag): ?array
    {
        $beforeAfterRegEx = fn ($tag) => '/^(?<BEFORE>[\s\S]*?)(?<START>'
            . $this->getStrRegEx($tag['before'] ?? '')
            . '[\s\t\n]*)(?<TAG>'
            . $this->getStrRegEx($tag['tag'] ?? '')
            . ')(?<END>[\s\t\n]*'
            . $this->getStrRegEx($tag['after'] ?? '')
            . ')(?<AFTER>[\s\S]*?)$/';

        $startRegEx = $beforeAfterRegEx(is_string($startTag) ? ['tag' => $startTag] : $startTag);
        $endRegEx = $beforeAfterRegEx(is_string($endTag) ? ['tag' => $endTag] : $endTag);

        preg_match($startRegEx, $template, $start);
        if (empty($start)) {
            return null;
        }

        preg_match($endRegEx, $start['AFTER'], $end);
        if (empty($end)) {
            return null;
        }

        return [
            'before' => $start['BEFORE'],
            'start' => ['before' => $start['START'], 'tag' => $start['TAG'], 'after' => $start['END']],
            'content' => $end['BEFORE'],
            'end' => ['before' => $end['START'], 'tag' => $end['TAG'], 'after' => $end['END']],
            'after' => $end['AFTER'],
        ];
    }

    private function splitEndTag(string &$after, string $startTag, string $endTag): ?array
    {
        $before = '';
        $level = 1;

        while ($next = $this->tagSplit($after, ['tag' => '/' . $this->getStrRegEx(self::OPEN_TAG) . '((' . $startTag . ')|(' . $endTag . '))' . '/'], self::CLOSE_TAG)) {
            $level += strpos($next['start']['tag'], $endTag) !== false ? -1 : 1;
            if (!$level) {
                $next['before'] = $before . $next['before'];
                return $next;
            }
            $after = $next['after'];
            $before .= $next['before'] . $next['start']['tag'] . $next['content'] . $next['end']['tag'];
        }

        return null;
    }

    private function bondaryTag(array &$tag, string $regStrBefore, string $regStrAfter): void
    {
        preg_match("/(?<BEFORE>[\\s\\S]*)(?<CONTENT>$regStrBefore)/", $tag['before'], $start);
        preg_match("/(?<CONTENT>$regStrAfter)(?<AFTER>[\\s\\S]*)/", $tag['after'], $end);
        $tag['start']['before'] = $start['CONTENT'] ?? '';
        $tag['before'] = $start['BEFORE'] ?? '';
        $tag['after'] = $end['AFTER'] ?? '';
        $tag['end']['after'] = $end['CONTENT'] ?? '';
    }

    private function processParamDrop(?array &$tag, string $params): void
    {
        $parameters = array_reduce(
            array_map(fn ($v) => explode('=', $v, 2), array_filter(explode(';', ltrim($params, ';')))),
            fn ($a, $v) => array_merge($a, [$v[0] => $v[1]]),
            []
        );

        if ($tag && isset($parameters[self::PARAMETER_DROP]) && preg_match('/^\w+$/', $parameters[self::PARAMETER_DROP])) {
            $this->bondaryTag($tag, '<' . $parameters[self::PARAMETER_DROP] . '>[\s\S]*?$', '^[\s\S]*?<\/' . $parameters[self::PARAMETER_DROP] . '>');
            $tag['start']['before'] = '';
            $tag['end']['after'] = '';
        }
    }

    public static function formataValor(mixed $valor, string $tipo): mixed
    {
        return match ($tipo) {
            'DATE' => UtilService::getDateFormatted($valor),
            'DATETIME' => UtilService::getDateTimeFormatted($valor),
            'TIME' => UtilService::getTimeFormatted($valor),
            default => $valor,
        };
    }

    public static function formataLookup(mixed $valor, string $lookup): ?string
    {
        $lookups = LookupService::LOOKUPS[$lookup] ?? null;
        return $lookups ? LookupService::getValue($lookups, $valor) : null;
    }
}
