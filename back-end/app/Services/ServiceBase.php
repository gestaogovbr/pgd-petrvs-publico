<?php

namespace App\Services;

use App\Exceptions\DataInvalidException;
use App\Exceptions\DBException;
use App\Exceptions\NotFoundException;
use App\Models\Entidade;
use App\Models\Tenant;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use App\Services\UtilService;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use App\Models\Unidade;
use Carbon\Carbon;
use ReflectionObject;
use Throwable;
use Exception;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Session;
use App\Exceptions\UnauthorizedUserPanelException;

class RawWhere
{
  public $expression;
  public $params;

  public function __construct($expression, $params)
  {
    $this->expression = $expression;
    $this->params = $params;
  }

  public static function raw($expression, $params = [])
  {
    return new RawWhere($expression, $params);
  }
}

class DynamicMethods
{
  public function __call($name, $arguments)
  {
  }
}

/**
 * @method proxySearch($query, $data, $text)
 * @method proxyRows($rows)
 * @method proxyGetAllIdsExtra($result, $data)
 * @method proxyQuery($query, $data)
 * @method proxyExtra($rows, $data, $count)
 * @method validateStore($dataOrEntity, $unidade, $action)
 * @method proxyStore($dataOrEntity, $unidade, $action)
 * @method extraStore($entity, $unidade, $action)
 * @method afterStore($entity, $action)
 * @method proxyUpdate($data, $unidade)
 * @method afterUpdate($entity, $data)
 * @method proxyUpdateJson($data, $unidade)
 * @method proxyDestroy($entity)
 * @method extraDestroy($entity)
 */
class ServiceBase extends DynamicMethods
{
  const OPERATORS = ["=", "==", "like", "in", "not in", "<", ">", "<>", "!=", ">=", "<="];
  const ISO8601_VALIDATE = '/^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))((T|\s)(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9])(:(0[0-9]|[1-5][0-9])(\.[0-9]{3})?)?)?Z?$/';
  const ISO8601_FORMAT = "Y-m-d\TH:i:s";
  const ACTION_INSERT = "INSERT";
  const ACTION_UPDATE = "UPDATE";
  const ACTION_EDIT = "EDIT";

  public string $collection = "";
  public $nivelAcessoService;

  public $buffer = []; /* Utilizado para passar informações entre os Proxys */

  /* instancia automaticamente os serviços */
  private $_services = [];
  public function __get($name)
  {
    $fullName = "App\\Services\\" . ucfirst(str_ends_with($name, "Service") ? $name : $name . "Service");
    if (empty($this->_services[$name]) && class_exists($fullName)) $this->_services[$name] = new $fullName();
    return class_exists($fullName) ? $this->_services[$name] : null;
  }


  public function __construct($collection = null)
  {
    $this->collection = $collection ?? $this->collection;
    if (empty($this->collection)) {
      $this->collection = str_replace("Service", "", str_replace("App\\Services", "App\\Models", get_class($this)));
    }
    Collection::macro("iso8601", function () {
      return $this->map(function ($values) {
        if (is_object($values) || is_array($values)) {
          foreach ($values as $key => $value) {
            $value = gettype($value) == "string" && preg_match(ServiceBase::ISO8601_VALIDATE, $value) && strtotime($value) ? new \DateTime($value) : $value;
            if ($value instanceof \DateTime) {
              if (is_object($values)) {
                $values->$key = Carbon::instance($value)->format(ServiceBase::ISO8601_FORMAT);
              } else {
                $values[$key] = Carbon::instance($value)->format(ServiceBase::ISO8601_FORMAT);
              }
            }
          }
        }
        return $values;
      });
    });
    Collection::macro("toDateTime", function () {
      return $this->map(function ($values) {
        if (is_object($values) || is_array($values)) {
          foreach ($values as $key => $value) {
            $value = gettype($value) == "string" && preg_match(ServiceBase::ISO8601_VALIDATE, $value) && strtotime($value) ? new \DateTime($value) : $value;
            if ($value instanceof \DateTime) {
              if (is_object($values)) {
                $values->$key = $value;
              } else {
                $values[$key] = $value;
              }
            }
          }
        }
        return $values;
      });
    });
  }

  public function hasStoredProcedure($procedure)
  {
    try {
      DB::select("SHOW CREATE PROCEDURE `" . $procedure . "`");
      return true;
    } catch (QueryException $error) {
      return false;
    }
  }

  /**
   * Get all foreign constraint of a table
   *
   * @param  string $table
   * @return Array
   */
  public function foreigns($table)
  {
    $sql = "SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME " .
      "FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE " .
      "WHERE REFERENCED_TABLE_SCHEMA = :database AND REFERENCED_TABLE_NAME = :table";
    $constraints = DB::select($sql, [':database' => env('DB_DATABASE'), ':table' => $table]);
    return $constraints;
  }

  public function getValue($objArray, $key)
  {
    return gettype($objArray) == "array" ? $objArray[$key] : $objArray->$key;
  }

  public function setValue($objArray, $key, $value)
  {
    if (gettype($objArray) == "array") {
      $objArray[$key] = $value;
    } else {
      $objArray->$key = $value;
    }
  }

  public function getStringKey($key)
  {
    if (in_array(gettype($key), ["array", "object"])) {
      $key = (array) $key;
      ksort($key);
      $key = md5(json_encode($key));
    }
    return $key;
  }

  public function setBuffer($section, $key, $value)
  {
    $key = $this->getStringKey($key);
    if (!array_key_exists($section, $this->buffer)) $this->buffer[$section] = [];
    $this->buffer[$section][$key] = $value;
    return $value;
  }

  public function getBuffer($section, $key)
  {
    $key = $this->getStringKey($key);
    if (!array_key_exists($section, $this->buffer)) $this->buffer[$section] = [];
    return array_key_exists($key, $this->buffer[$section]) ? $this->buffer[$section][$key] : null;
  }

  public function hasBuffer($section, $key)
  {
    $key = $this->getStringKey($key);
    if (!array_key_exists($section, $this->buffer)) $this->buffer[$section] = [];
    return array_key_exists($key, $this->buffer[$section]);
  }

  public function arrayDelta(&$from, &$to)
  {
    $result = [];
    $ids = [];
    foreach ($to as $current) {
      $ids[] = $current->id;
      $src = array_filter($from, fn ($v) => $this->getValue($v, "id") == $this->getValue($current, "id"));
      if (count($src) == 1) {
        $delta = $this->delta($src[0], $current);
        if (!empty($delta)) $result[] = $delta;
      } else {
        $delta = clone $current;
        $this->setValue($delta, "_status", "ADD");
        $result[] = $delta;
      }
    }
    foreach ($from as $current) {
      if (!in_array($this->getValue($current, "id"), $ids)) $result[] = gettype($current) == "array" ? (object) ["id" => $current->id, "_status" => "DEL"] : ["id" => $current->id, "_status" => "DEL"];
    }
    return empty($result) ? null : $result;
  }

  public function delta($from, $to)
  {
    $isArray = gettype($to) == "array";
    $before = (array) $from;
    $now = (array) $to;
    $result = [];
    if (!isset($from)) {
      $result = (array) (clone (object) $now);
      $result["_status"] = "ADD";
    } else {
      if (gettype($from) != gettype($to)) throw new DataInvalidException("ObjectDelta: Tipos diferentes");
      foreach ($now as $key => $value) {
        if (gettype($value) == "array") {
          $delta = isset($before[$key]) ? $this->arrayDelta($before[$key], $value) : $value;
          if (!empty($delta)) {
            $result[$key] = $delta;
            $result["_status"] = "EDIT";
          }
        } else if (gettype($value) == "object") {
          $delta = (array) isset($before[$key]) ? $this->delta($before[$key], $value) : clone $value;
          if (!empty($delta)) {
            $delta["_status"] = "EDIT";
            $result[$key] = $delta;
            $result["_status"] = "EDIT";
          }
        } else if (!isset($before[$key]) || gettype($before[$key]) != gettype($value) || strval($before[$key]) != strval($value)) {
          $result[$key] = $value;
          $result["_status"] = "EDIT";
        }
      }
    }
    return empty($result) ? null : ($isArray ? $result : (object) $result);
  }

  public function applyDelta(&$from, &$delta)
  {
  }

  public static function toIso8601($fromData)
  {
    return Carbon::instance($fromData)->format(ServiceBase::ISO8601_FORMAT);
  }

  /** Pesquisa se existe uma condição de busca envolvendo o campo procurado. Devolve a condição, se existir, ou null, caso contrário.
   * @param array $data   array com as condições para a cláusula WHERE da consulta
   * @param string $field campo procurado
   * @return array $result    array com a condição que envolve o campo procurado, ou null
   */
  function extractWhere(&$data, $field)
  {
    $result = null;
    $where = [];
    foreach ($data["where"] as $condition) {
      if (is_array($condition) && $condition[0] == $field) {
        $result = $condition;
      } else {
        $where[] = $condition;
      }
    }
    if (!empty($result)) $data["where"] = $where;
    return $result;
  }

  function extractWith(&$data, $field)
  {
    $result = null;
    $with = [];
    foreach ($data["with"] as $join) {
      if ($join[0] == $field) {
        $result = $join;
      } else {
        $with[] = $join;
      }
    }
    if (!empty($result)) $data["with"] = $with;
    return $result;
  }

  public function getModel()
  {
    return empty($this->collection) ? null : App($this->collection);
  }

  public function getFilterValue($where, $field)
  {
    $entry = array_values(array_filter($where, function ($value) use ($field) {
      return $value[0] == $field;
    }));
    return !empty($entry) ? $entry[0][2] : null;
  }

  public function convertOperator($operator)
  {
    return $operator == "==" ? "=" : $operator;
  }

  public function getCamelWith($with)
  {
    $result = [];
    foreach ($with as $key => $item) {
      $withFields = explode(":", gettype($key) == "integer" ? $item : $key);
      $relations = array_map(function ($sub) {
        return \Illuminate\Support\Str::camel($sub);
      }, explode(".", $withFields[0]));
      $withFields[0] = implode(".", $relations);
      $newValue = implode(":", $withFields);
      if (gettype($key) == "integer") {
        array_push($result, $newValue);
      } else {
        $result[$newValue] = $item;
      }
    }
    return $result;
  }

  protected function chooseWhere($query, $or, $first, $where, &$data = [])
  {
    $triade = count($where) == 3 && in_array($where[1], ServiceBase::OPERATORS);
    $proxyWhere = function ($query) use ($where, &$data) {
      $this->applyWhere($query, $where, $data);
    };
    if ($triade) {
      $field = $where[0];
      $operator = $where[1];
      $value = $where[2];
      if (gettype($field) == "string") {
        $model = App($this->collection);
        $source = $model->getTable();
        $aliasField = "_" . str_replace(".", "_", $field);
        $fieldPath = explode(".", $field);
        $field = array_pop($fieldPath);
        if (count($fieldPath) > 0) {
          $source = $this->applyJoin($query, $data, $fieldPath, $model);
          array_push($data["select"], $source . "." . $field . " AS " . $aliasField);
        }
        $field = DB::raw($source . "." . $field);
      }
      if (!$or || $first) {
        if (!isset($value) && in_array($operator, ["=", "==", "!=", "<>"])) {
          if (in_array($operator, ["!=", "<>"])) {
            $query->whereNotNull($field);
          } else {
            $query->whereNull($field);
          }
        } else if ($operator == "in") {
          $query->whereIn($field, $value);
        } else if ($operator == "not in") {
          $query->whereNotIn($field, $value);
        } else {
          $query->where($field, $this->convertOperator($operator), $value);
        }
      } else {
        if ($value == null && in_array($operator, ["=", "==", "!=", "<>"])) {
          if (in_array($operator, ["!=", "<>"])) {
            $query->orWhereNotNull($field);
          } else {
            $query->orWhereNull($field);
          }
        } else if ($operator == "in") {
          $query->orWhereIn($field, $value);
        } else if ($operator == "not in") {
          $query->orWhereNotIn($field, $value);
        } else {
          $query->orWhere($field, $this->convertOperator($operator), $value);
        }
      }
    } else if ($or && !$first) {
      $query->orWhere($proxyWhere);
    } else {
      $query->where($proxyWhere);
    }
  }

  protected function applyWhere($query, $where, &$data = [])
  {
    $or = false;
    $first = false;
    $data["join"] = $data["join"] ?? [];
    foreach ($where as $value) {
      if (gettype($value) == "string") {
        $or = $value == "or" ? true : ($value == "and" ? false : $or);
        $first = true;
      } else if ($value instanceof RawWhere) {
        if ($or) {
          $query->orWhereRaw($value->expression, $value->params);
        } else {
          $query->whereRaw($value->expression, $value->params);
        }
      } else if (gettype($value) == "array") {
        $this->chooseWhere($query, $or, $first, $value, $data);
        $first = false;
      }
    }
  }

  protected function prefixField($field, $prefix = null)
  {
    $prefix = $prefix ?? $this->collection;
    $collection = str_contains($field, ".") ? substr($field, 0, strpos($field, ".")) : $prefix;
    $column = str_contains($field, ".") ? substr($field, strpos($field, ".") + 1) : $field;
    $model = App(str_starts_with($collection, 'App\\Models\\') ? $collection : 'App\\Models\\' . $collection);
    $table = !empty($model) ? $model->getTable() : $prefix;
    return $table . "." . $column;
  }

  protected function prefixWhere($where, $prefix)
  {
    foreach ($where as $key => $value) {
      if (gettype($value) == "array") {
        if (count($value) == 3 && gettype($value[0]) == "string" && in_array($value[1], ServiceBase::OPERATORS)) {
          $where[$key][0] = DB::raw($this->prefixField($where[$key][0], $prefix));
        } else {
          $where[$key] = $this->prefixWhere($value, $prefix);
        }
      }
    }
    return $where;
  }

  protected function applyJoin($query, &$data, $path, $context)
  {
    $alias = "";
    $source = !empty($context) ? $context->getTable() : null;
    foreach ($path as $relationName) {
      $relation = $context->{Str::camel($relationName)}();
      $kind = (new ReflectionObject($relation))->getShortName();
      if ($kind != "BelongsTo" && $kind != "HasOne") {
        throw new DBException("Permitido apenas relacionamentos belongsTo ou hasOne");
      }
      $fkName = $kind == "BelongsTo" ? $relation->getForeignKeyName() : $context->getKeyName();
      $idName = $kind == "BelongsTo" ? $relation->getOwnerKeyName() : $relation->getForeignKeyName();
      $context = $relation->getRelated();
      $fTable = $context->getTable();
      $alias .= "_" . ($kind == "BelongsTo" ? preg_replace("/_id$/", "", $fkName) : $relationName);
      if (!array_key_exists($alias, $data["join"])) {
        $join = [$fTable . " AS " . $alias, $alias . "." . $idName, $source . "." . $fkName];
        //O leftJoin foi movido para a função query(), pois lá aplica ao contexto pai
        //$query->leftJoin($join[0], $join[1], "=", $join[2]);
        $data["join"][$alias] = $join;
      }
      $source = $alias;
    }
    return $source;
  }

  protected function applyOrderBy($query, &$data)
  {
    $model = !empty($this->collection) ? App($this->collection) : null;
    $data['orderBy'] = $data['orderBy'] ?? [];
    $data["join"] = $data["join"] ?? [];
    foreach ($data['orderBy'] as $order) {
      $fieldPath = explode(".", $order[0]);
      $field = array_pop($fieldPath);
      $source = $this->applyJoin($query, $data, $fieldPath, $model);
      $aliasField = "_" . str_replace(".", "_", $order[0]);
      if (strtolower($order[1]) == "desc") {
        $query->orderByDesc(DB::raw($aliasField));
      } else {
        $query->orderBy(DB::raw($aliasField));
      }
      array_push($data["select"], $source . "." . $field . " AS " . $aliasField);
    }
  }

  private function getSelectable($fields)
  {
    foreach ($fields as $field) {
      $slices = explode(".", $field);
      $model = App($this->collection);
    }
  }

  /**
   * Search for a given text
   *
   * @param  Array $data
   * @return Array
   */
  public function searchText($data)
  {
    $text = "%" . str_replace(" ", "%", $data['query']) . "%";
    $model = App($this->collection);
    $table = $model->getTable();
    $data["select"] = array_map(fn ($field) => str_contains($field, ".") ? $field : $table . "." . $field, array_merge(['id'], $data['fields']));
    $query = $model::query();
    if (method_exists($this, 'proxySearch')) $this->proxySearch($query, $data, $text);
    $likes = ["or"];
    foreach ($data['fields'] as $field) {
      array_push($likes, [$field, 'like', $text]);
    }
    $condicaoDeletados = array_filter($data['where'], fn ($w) => is_array($w) && $w[0] == "deleted_at");
    if (empty($condicaoDeletados)) array_push($data['where'], ['deleted_at', '==', null]);
    //$where = count($data['where']) > 0 ? [$likes, $data['where']] : $likes;
    $where = [$likes, $data['where']];
    $this->applyWhere($query, $where, $data);
    $sql = $query->toSql();
    $this->applyOrderBy($query, $data);
    $query->select($data["select"]);

    $rows = $query->get();
    $values = [];
    foreach ($rows as $row) {
      // Certifique-se de que $row seja tratado como array
      $rowArray = $row instanceof \Illuminate\Database\Eloquent\Model ? $row->toArray() : (array) $row;

      $orderFilds = array_map(fn ($order) => "_" . str_replace(".", "_", $order[0]), $data['orderBy'] ?? []);
      $orderValues = array_map(fn ($field) => $rowArray[$field], $orderFilds);

      array_push($values, [
          $rowArray['id'],
          array_map(fn ($field) => $rowArray[$field], $data['fields']),
          $orderValues
      ]);
    }
    return $values;
  }

  /**
   * Search for a given key
   *
   * @param  Array $data
   * @return Array
   */
  public function searchKey($data)
  {
    $model = App($this->collection);
    $entity = $model::query();
    if (count($data['with']) > 0) {
      $this->applyWith($entity, $data);
    }
    $entity = $entity->find($data["key"]);
    $text = "";
    if (!empty($entity)) {
      foreach ($data["fields"] as $field) {
        $text .= empty($text) ? "" : " - ";
        $text .= $entity->$field;
      }
      return [
        'value' => $data["key"],
        'text' => $text,
        'data' => array_map(fn ($field) => array_reduce(explode(".", $field), fn ($a, $i) => $a->$i, $entity), $data['fields']),
        'entity' => $entity
      ];
    }
    return null;
  }


  /**
   * Find correponding with inside $joinable variable
   *
   * @param string $with
   * @return string | null
   */
  private function findWith($with)
  {
    $getRelationAndFields = function ($with) {
      $exploded = explode(":", $with);
      return [$exploded[0], count($exploded) > 1 ? array_map('trim', explode(",", $exploded[1])) : []];
    };
    $withRealtionFields = $getRelationAndFields($with);
    foreach ($this->joinable as $join) {
      $joinRelationFields = $getRelationAndFields($join);
      if ($joinRelationFields[0] == $withRealtionFields[0]) {
        $fields = [];
        foreach ($joinRelationFields[1] as $joinField) {
          if (count($withRealtionFields[1]) == 0 || in_array($joinField, $withRealtionFields[1])) $fields[] = $joinField;
        }
        return count($joinRelationFields[1]) == 0 ? (count($withRealtionFields[1]) == 0 ? $withRealtionFields[0] : $withRealtionFields[0] . ":" . implode(",", $withRealtionFields[1])) : (count($fields) == 0 ? null : $joinRelationFields[0] . ":" . implode(",", $fields));
      }
    }
    return null;
  }

  /**
   * Get "with" relationship validating with $joinable variable
   *
   * @param Array $with
   * @return Array
   */
  public function getJoinable($with)
  {
    $result = [];
    foreach ($with as $key => $value) {
      if (gettype($key) != "string" || is_callable($value)) {
        $relation = gettype($key) == "string" ? $key : $value;
        $join = $this->findWith($relation);
        if ($join != null) {
          if (gettype($key) == "string") {
            $result[$join] = $value;
          } else {
            $result[] = $join;
          }
        }
      }
    }
    return $result;
  }


  /**
   * Get entity by id
   *
   * @param  Array $data
   * @return Object
   */
  public function getById($data)
  {
    $model = $this->getModel();
    $query = $model::query();
     $data["with"] = isset($data["with"]) ? $data["with"] : [];
     $data["with"] = isset($this->joinable) ? $this->getJoinable($data["with"]) : $data["with"];
    if (count($data['with']) > 0) {
      $this->applyWith($query, $data);
    }
    $query->where('id', $data['id']);
    $query = is_subclass_of(get_class($model), "App\Models\ModelBase") ? $query->withTrashed() : $query;
    $rows = method_exists($this, 'proxyRows') ? $this->proxyRows($query->get()) : $query->get();
    if (count($rows) == 1) {
      return $rows[0];
    } else {
      throw new NotFoundException("Id não encontrado");
    }
  }

  /**
   * Get all ids
   *
   * @param  Array $data
   * @return Object
   */
  public function getAllIds($data)
  {
    $data['fields'] = array_merge(["id"], $data['fields'] ?? []);
    $result = $this->query($data);
    $result["extra"] = method_exists($this, 'proxyGetAllIdsExtra') ? $this->proxyGetAllIdsExtra($result, $data) : null;
    /* Remove os campos do with que são desnecessários */
    $allowed = array_merge(array_map(fn ($value) => strtok($value, '.'), $data['fields']), ["id"]);
    $result["rows"] = $result["rows"]->toArray();
    foreach ($result["rows"] as &$row) {
      $deletes = array_diff(array_keys($row), $allowed);
      foreach ($deletes as $delete) unset($row[$delete]);
    }
    return $result;
  }

  /**
   * Query
   *
   * @param  Array $data
   * @return Array
   */
  public function query($data)
  {
    $model = $this->getModel();
    $table = $model->getTable();
    $data["select"] = array_map(fn ($field) => str_contains($field, ".") ? $field : $table . "." . $field, $data['fields'] ?? ["*"]);
    $query = $model::query();
    if (!empty($data["deleted"]) && $data["deleted"]) $query = is_subclass_of(get_class($model), "App\Models\ModelBase") ? $query->withTrashed() : $query;
    if (method_exists($this, 'proxyQuery')) $this->proxyQuery($query, $data);
    $data["with"] = isset($this->joinable) ? $this->getJoinable($data["with"] ?? []) : $data["with"] ?? [];
    if (count($data['with']) > 0) {
      $this->applyWith($query, $data);
    }
    $this->applyWhere($query, $data['where'], $data);
    $this->applyOrderBy($query, $data);
    $query->select($data["select"]);
    foreach ($data["join"] as $join) $query->leftJoin($join[0], $join[1], "=", $join[2]);
    $count = $query->count();
    if (!empty($data['limit'])) {
      $query->skip(max($data['page'] - 1, 0) * $data['limit'])->take($data['limit']);
    }
    $rows = $query->get();
    $rows = method_exists($this, 'proxyRows') ? $this->proxyRows($rows) : $rows;
    $extra = method_exists($this, 'proxyExtra') ? $this->proxyExtra($rows, $data, $count) : null;
    return [
      'count' => $count,
      'rows' => $rows,
      'extra' => $extra
    ];
  }

  /**
   * Download a file with signed url
   *
   * @param  string $file
   * @return string
   */
  public function download($tenantId, string $file)
  {
    $tenant = tenancy()->find($tenantId);
    return $tenant->run(function () use ($file) {
      if (!Storage::exists($file)) {
        throw new NotFoundException("Arquivo não encontrado");
      }
      return Storage::path($file);
    });
  }

  /**
   * Get public Url of file
   * - file: File path
   *
   * @param  string $file
   * @return string
   */
  public function downloadUrl($file)
  {
    if (!Storage::exists($file)) {
      throw new NotFoundException("Arquivo não encontrado");
    }
    $url = URL::temporarySignedRoute('download', now()->addMinutes(30), ['tenant' => tenant('id'), 'file' => $file], false);
    $url = substr($url, strpos($url, "download/")); /* Convert to relative path from absolute */
    return $url;
  }

  /**
   * Delete a file
   * - file: File path
   *
   * @param  string $file
   * @return boolean
   */
  public function deleteFile($file)
  {
    if (!Storage::exists($file)) {
      throw new NotFoundException("Arquivo não encontrado");
    }
    Storage::delete($file);
    return true;
  }

  /**
   * Upload file from multipart/form-data with fields:
   * - path: Relative path to file
   * - name: Name of file
   * - file: File data
   *
   * @param  string $path
   * @param  string $name
   * @param  \Illuminate\Http\UploadedFile $file
   * @return string
   */
  public function upload($path, $name, $file)
  {
    if (!empty($file)) {
      if (!Storage::exists($path)) {
        Storage::makeDirectory($path, 0755, true);
      }
      $path = $file->storeAs($path, $name);
      return $path;
    } else {
      throw new NotFoundException("Arquivo vazio");
    }
  }

  /**
   * Upload file from multipart/form-data with fields:
   * - path: Relative path to file
   * - name: Name of file
   * - file: Base64 of file
   *
   * @param  string $path
   * @param  string $name
   * @param  string $file
   * @return string
   */
  public function uploadBase64($path, $name, $file)
  {
    if (!Storage::exists($path)) {
      Storage::makeDirectory($path, 0755, true);
    }
    $file = strpos($file, ';base64') ? explode(',', $file)[1] : $file;
    $path = Storage::putFileAs($path, base64_decode($file), $name);
    return $path;
  }


  /**
   * Store a newly created resource in storage.
   *
   * @param  Array   $dataOrEntity
   * @param  Object  $unidade
   * @param  Boolean $transaction
   * @return Object
   */
  public function store($dataOrEntity, $unidade, $transaction = true)
  {
    $model = $this->getModel();
    $entity = UtilService::emptyEntry($dataOrEntity, "id") ? null : $model::find($dataOrEntity["id"]);
    $action = empty($entity) ? ServiceBase::ACTION_INSERT : ServiceBase::ACTION_EDIT;
    $entity = isset($entity) ? $entity : new $model();
    try {
      if ($transaction) DB::beginTransaction();
      if (method_exists($this, "validateStore")) $entity = $this->validateStore($dataOrEntity, $unidade, $action) ?: $entity;
      $dataOrEntity = method_exists($this, "proxyStore") ? $this->proxyStore($dataOrEntity, $unidade, $action) : $dataOrEntity;
      $dataOrEntity = method_exists($entity, "proxyFill") ? $entity->proxyFill($dataOrEntity, $unidade, $action) : $entity->fill($dataOrEntity);
      $entity->save();
      if (method_exists($this, "extraStore")) $this->extraStore($entity, $unidade, $action);
      if ($transaction) DB::commit();
    } catch(UnauthorizedUserPanelException $e) {
      if ($transaction) DB::rollback();
      throw $e;
    }
    catch (Throwable $e) {
      if ($transaction) DB::rollback();
      throw $e;
    }
    $action = $entity->wasRecentlyCreated ? ServiceBase::ACTION_INSERT : ServiceBase::ACTION_EDIT;
    $entity->fresh();
    if (method_exists($this, "afterStore")) $this->afterStore($entity, $action);
    return $entity;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  Array $data
   * @return Object
   */
  public function update($data, $unidade, $transaction = true)
  {
    $model = $this->getModel();
    $entity = $model::find($data['id']);
    $submit = [];
    if (isset($entity)) {
      try {
        if ($transaction) DB::beginTransaction();
        $data = method_exists($this, "proxyUpdate") ? $this->proxyUpdate($data, $unidade) : $data;
        $data = method_exists($entity, "proxyFill") ? $entity->proxyFill($data, $unidade, ServiceBase::ACTION_EDIT) : $data;
        $keys = $entity->toArray();
        $fillable = array_merge($entity->fillable_relations ?? [], $entity->fillable_changes ?? []);
        $relations = [];
        foreach ($data as $key => $value) {
          if (in_array($key, $fillable)) {
            $relations[$key] = $value;
          } else if (array_key_exists($key, $keys) && $key != "id") {
            $submit[$key] = $value;
          }
        }
        if ($relations) $entity->fillRelations($relations);
        $model::where('id', $data['id'])->update($submit);
        $entity->fresh();
        if (method_exists($this, "extraUpdate")) $this->extraUpdate($entity, $unidade);
        if ($transaction) DB::commit();
      } catch (Throwable $e) {
        if ($transaction) DB::rollback();
        throw $e;
      }
      if (method_exists($this, "afterUpdate")) $this->afterUpdate($entity, $data);
      return $entity;
    } else {
      throw new NotFoundException("Id não encontrado");
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  Array $data
   * @return Object
   */
  public function updateJson($data, $unidade, $transaction = true)
  {
    $model = $this->getModel();
    $entity = $model::find($data['id']);
    if (isset($entity)) {
      try {
        if ($transaction) DB::beginTransaction();
        $data = method_exists($this, "proxyUpdateJson") ? $this->proxyUpdateJson($data, $unidade) : $data;
        if ($data['data'] == null) {
          $model::where('id', $data['id'])->update([$data['field'] => null]);
        } else {
          $model::where('id', $data['id'])->addBinding(json_encode($data['data']), 'join')->update([
            $data['field'] => DB::raw("JSON_MERGE_PATCH(IFNULL(" . preg_replace('/[^a-z0-9_]/i', '', $data['field']) . ", '{}'), ?)")
          ]);
        }
        $entity->fresh();
        if ($transaction) DB::commit();
        return $entity;
      } catch (Throwable $e) {
        if ($transaction) DB::rollback();
        throw $e;
      }
    } else {
      throw new NotFoundException("Id não encontrado");
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  string $id
   * @return boolean
   */
  public function destroy($id, $transaction = true)
  {
    $model = $this->getModel();
    $entity = $model::find($id);
    if (isset($entity)) {
      try {
        if ($transaction) DB::beginTransaction();
        if (method_exists($this, "proxyDestroy") ? $this->proxyDestroy($entity) : true) {
          if (method_exists($entity, 'deleteCascade')) $entity->deleteCascade();
        }
        if (method_exists($this, "extraDestroy")) $this->extraDestroy($entity);
        if ($transaction) DB::commit();
        return true;
      } catch (Throwable $e) {
        if ($transaction) DB::rollback();
        throw $e;
      }
    } else {
      throw new NotFoundException("Id não encontrado");
    }
  }

  /**
   * @return boolean Informa se o usuário logado possui o perfil de Desenvolvedor ou não.
   */
  public function isLoggedUserADeveloper()
  {
    $nivelAcesso = NivelAcessoService::getPerfilDesenvolvedor();
    $developerId = $nivelAcesso ? $nivelAcesso->id : null;
    return Auth::user()->perfil_id == $developerId;
  }

  /**
   * Retorna o usuário logado
   *
   * @return App\Models\Usuario | null
   */
  public static function loggedUser(): ?Usuario
  {
    return Auth::user();
  }


  /**
   * Retorna a entidade atual do usuário logado
   *
   * @return App\Models\Entidade | null
   */
  public static function entidade(): Entidade
  {
    return Entidade::find(Session::get('entidade_id'));
  }

  /**
   * Retorna a unidade atual do usuário logado (Área de trabalho selecionada)
   *
   * @return App\Models\Unidade | null
   */
  public function unidade()
  {
    return Entidade::find(Session::get('unidade_id'));
  }

  /**
   * Retorna a data e hora em formato ISO8601 da unidade atual do usuário logado (Área de trabalho selecionada)
   *
   * @return string
   */
  public function dataHora()
  {
    $unidadeId = Session::get('unidade_id') ?? $this->loggedUser()->lotacao?->unidade_id;
    if (empty($unidadeId)) $unidadeId = Unidade::whereNull("unidade_pai_id")->fisrt()?->id;
    return $this->unidadeService->hora(Session::get('unidade_id'));
  }

  /**
   * @return Unidade Retorna a Unidade de lotação do usuário logado
   */
  public static function unidadeLotacaoUsuarioLogado(): Unidade
  {
    return static::loggedUser()->lotacao->unidade;
  }

  /**
   * Este método aplica os relacionamentos
   */
  public function applyWith(&$entity, &$data)
  {
    $data['with'] = $this->getCamelWith($data['with']);
    //$model = $this->getModel();
    foreach ($data['with'] as $key => $with) {
      $withs = explode('.', $with);
      $last = array_slice($withs, -1, 1)[0];
      if (str_contains($last, ':')) {   // se o último elemento contiver campos...
        $entity->with(gettype($key) == "string" ? [$key => $with] : $with);  // aplica o método 'with' normalmente nele...
        array_splice($withs, -1, 1, explode(':', $last)[0]);   // depois retira os : e os campos
      }
      while (count($withs) > 0) {
        $entity->with(implode('.', $withs));
        array_pop($withs);
      }
    }
  }

  public function getNestedModel($model, $nested)
  {
    $relations = explode('.', explode(':', $nested)[0]);
    foreach ($relations as $related) {
      if (method_exists($model, Str::camel($related))) {
        $relation = $model->{Str::camel($related)}();
        $model = $relation->getRelated();
      } else {
        return null;
      }
    }
    return $model;
  }
}
//$query->toSql();    $query->getBindings();
