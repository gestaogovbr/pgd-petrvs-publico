<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Traits\AutoUuid;
use App\Traits\MergeRelations;
use App\Traits\LogChanges;
use ReflectionObject;
use Exception;

class ModelBase extends Model
{
    use HasFactory, AutoUuid, MergeRelations, LogChanges;
    protected $keyType = 'string';
    public $incrementing = false;

    // Mutattors e Casts
    // Functions
    public function jsonEncodeArrayList(array $values, array $validsValues) {
        foreach($values as $value) {
            if(!in_array($value, $validsValues)){
                throw new Exception("'$value' is not a valid value");
            }
        }
        return json_encode($values);
    }
    public function deleteCascade() {
        if(property_exists($this, 'delete_cascade')) {
            foreach ($this->delete_cascade as $relationName) {
                $relation = $this->{Str::camel($relationName)}();
                $relationType = (new ReflectionObject($relation))->getShortName();
                if(in_array($relationType, ["HasMany", "HasOne"])) {
                    $relatedModel = $relation->getRelated();
                    $children = $relatedModel::where($relation->getForeignKeyName(), $this->id)->get();
                    foreach ($children as $chield) {
                        $chield->deleteCascade();
                    }
                }
                /*BelongsTo 
                HasOne
                HasMany
                $relation = $this->{Str::camel($relationName)}();
                $relatedKeyName = $relatedModel->getKeyName();
                $parentKey = $relation->getParentKey();
                $foreignKeyName = $relation->getForeignKeyName();
                $related = ($relatedModel::find($relatedId) ?? new $relatedModel())->fill($related);
                $relatedModel->whereIn($relatedModel->getKeyName(), $deleteKeys)->delete();*/
        
            }            
        }
        $this->delete();
    }
}