<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatelogueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'designation' => $this->designation,
            'type' => new CategorieResource($this->typeCategorie),
            'stock' => $this->stock,
            'entre' => $this->entre,
            'sortie' => $this->sortie,
            'created_at' => (new Carbon($this->created_at))->format
            ( 'Y-m-d'),
        ];
    }
}
