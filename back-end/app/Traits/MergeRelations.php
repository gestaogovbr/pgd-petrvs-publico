<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use RuntimeException;
use ReflectionObject;

trait MergeRelations
{
    public static function create(array $attributes = [])
    {
        list($relations, $attributes) = (new static)->extractFillableRelations($attributes);
        $model = new static($attributes);
        if(count($relations) > 0) {
            $model->save();
            $model->refresh();
            $model->fillRelations($relations);
        }
        return $model;
    }

    public function fill(array $attributes)
    {
        list($relations, $attributes) = $this->extractFillableRelations($attributes);
        parent::fill($attributes);
        if(count($relations) > 0) {
            $this->save();
            $this->refresh();
            $this->fillRelations($relations);
        }
        return $this;
    }

    public function relationsAttributes(array $attributes) {
        $self = $this;
        return array_filter($attributes, function($key) use ($self) {
            return in_array($key, $self->fillableRelations());
        }, ARRAY_FILTER_USE_KEY);
    }

    public function 
    fillableRelations()
    {
        $fillable = [];
        if(isset($this->fillable_relations)) $fillable = array_merge($fillable, $this->fillable_relations);
        if(isset($this->fillable_changes)) $fillable = array_merge($fillable, $this->fillable_changes);
        return $fillable;
    }

    public function fillableChange($relationName) {
        return isset($this->fillable_changes) && in_array($relationName, $this->fillable_changes);
    }

    public function extractFillableRelations(array $attributes)
    {
        $relationsAttributes = [];

        foreach ($this->fillableRelations() as $relationName) {
            $val = Arr::pull($attributes, $relationName);
            if ($val !== null) {
                $relationsAttributes[$relationName] = $val;
            }
        }

        return [$relationsAttributes, $attributes];
    }

    public function fillRelations(array $relations)
    {
        foreach ($this->fillableRelations() as $relationName) {
            if(array_key_exists($relationName, $relations)) {
                $relation = $this->{Str::camel($relationName)}();
                $relationType = (new ReflectionObject($relation))->getShortName();
                $method = "fill{$relationType}Relation";
                if (!method_exists($this, $method)) {
                    throw new RuntimeException("Unknown or unfillable relation type {$relationType} ({$relationName})");
                }
                $this->{$method}($relation, $relations[$relationName], $relationName);
            }
        }
    }

    /**
     * @param BelongsTo $relation
     * @param array|Model $attributes
     */
    public function fillBelongsToRelation(BelongsTo $relation, $attributes, $relationName)
    {
        $entity = $attributes;
        if (!$attributes instanceof Model) {
            $entity = $relation->getRelated()
                ->where($attributes)->firstOrFail();
        }

        $relation->associate($entity);
    }

    /**
     * @param HasOne $relation
     * @param array|Model $attributes
     */
    public function fillHasOneRelation(HasOne $relation, $attributes, $relationName)
    {
        $this->mergeRelation($relation, [$attributes], $relationName);
    }

    /**
     * @param HasMany $relation
     * @param array $attributes
     */
    public function fillHasManyRelation(HasMany $relation, array $attributes, $relationName)
    {
        $this->mergeRelation($relation, $attributes, $relationName);
    }

    /**
     * @param HasOneOrMany $relation
     * @param array $attributes
     */
    private function mergeRelation($relation, array $attributes, $relationName)
    {
        if (!$this->exists) {
            $this->save();
            $relation = $this->{Str::camel($relationName)}();
        }
        $isChange = $this->fillableChange($relationName);
        $keepKeys = [];
        $deleteKeys = [];
        $relatedModel = $relation->getRelated();
        $relatedKeyName = $relatedModel->getKeyName();
        $parentKey = $relation->getParentKey();
        $foreignKeyName = $relation->getForeignKeyName();
        foreach ($attributes as $related) {
            $save = true;
            if (!$related instanceof Model) {
                $relatedId = array_key_exists($relatedKeyName, $related) ? $related[$relatedKeyName] : "";
                $relatedId = empty($relatedId) ? (string) Uuid::uuid4() : $relatedId; /* Garante que se o ID veio vazio, será gera um */
                if(isset($related["_status"]) && $related["_status"] == "DELETE") {
                    array_push($deleteKeys, $relatedId);
                    $save = false;
                } else {
                    $related[$foreignKeyName] = $parentKey;
                    $related = ($relatedModel::find($relatedId) ?? new $relatedModel())->fill($related);
                    $related->id = $relatedId;
                }
            }
            if($save) {
                $related = $relation->save($related);
                array_push($keepKeys, $related->getKey());
            }
        }
        $toDelete = empty($parentKey) ? [] : ($isChange ? $relatedModel->whereIn($relatedModel->getKeyName(), $deleteKeys)->get() : $relatedModel->where($foreignKeyName, $parentKey)->whereNotIn($relatedModel->getKeyName(), $keepKeys)->get());
        foreach($toDelete as $entity) if(method_exists($entity, 'deleteCascade')) $entity->deleteCascade(); else $entity->delete();
        /*if(!$isChange && !empty($parentKey)) {
            //$relatedModel->where($foreignKeyName, $parentKey)->whereNotIn($relatedModel->getKeyName(), $keepKeys)->delete();
            $entities = $relatedModel->where($foreignKeyName, $parentKey)->whereNotIn($relatedModel->getKeyName(), $keepKeys)->get();
            foreach($entities as $entity) if(method_exists($entity, 'deleteCascade')) $entity->deleteCascade(); else $entity->delete();
        }
        if($isChange && !empty($deleteKeys)) {
            //$relatedModel->whereIn($relatedModel->getKeyName(), $deleteKeys)->delete();
            $entities = $relatedModel->whereIn($relatedModel->getKeyName(), $deleteKeys)->get();
            foreach($entities as $entity) if(method_exists($entity, 'deleteCascade')) $entity->deleteCascade(); else $entity->delete();
        }*/
    }


/**********************************************************************************
 * 
 * Implementar os métodos abaixo para funcionar como merge
 * 
 *********************************************************************************/


    /**
     * @param BelongsToMany $relation
     * @param array $attributes
     */
    public function fillBelongsToManyRelation(BelongsToMany $relation, array $attributes, $relationName)
    {
        if (!$this->exists) {
            $this->save();
            $relation = $this->{Str::camel($relationName)}();
        }

        $relation->detach();
        $pivotColumns = [];
        foreach ($attributes as $related) {
            if (isset($related['pivot']) && is_array($related['pivot'])) {
                $pivotColumns = $related['pivot'];
                unset($related['pivot']);
            }
            if (!$related instanceof Model) {
                $related = $relation->getRelated()
                    ->where($related)->firstOrFail();
            }

            $relation->attach($related, $pivotColumns);
        }
    }

    /**
     * @param MorphTo $relation
     * @param array|Model $attributes
     */
    public function fillMorphToRelation(MorphTo $relation, $attributes, $relationName)
    {
        $entity = $attributes;

        if (! $entity instanceof Model) {
            $entity = $relation->getRelated()->firstOrCreate($entity);
        }

        $relation->associate($entity);
    }

    /**
     * @param HasMany $relation
     * @param array $attributes
     */
    public function fillMorphManyRelation(MorphMany $relation, array $attributes, $relationName)
    {
        if (!$this->exists) {
            $this->save();
            $relation = $this->{Str::camel($relationName)}();
        }

        $relation->delete();

        foreach ($attributes as $related) {
            if (!$related instanceof Model) {
                if (method_exists($relation, 'getHasCompareKey')) { // Laravel 5.3
                    $foreign_key = explode('.', $relation->getHasCompareKey());
                    $related[$foreign_key[1]] = $relation->getParent()->getKey();
                } else {  // Laravel 5.5+
                    $related[$relation->getForeignKeyName()] = $relation->getParentKey();
                }
                $related = $relation->getRelated()->newInstance($related);
                $related->exists = $related->wasRecentlyCreated;
            }

            $relation->save($related);
        }
    }
}