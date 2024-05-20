<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MagasinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
<<<<<<< HEAD
        return parent::toArray($request);

=======
        return [
            'idMagasin'=>$this->idMagasin,
            'nomMagasin'=>$this->nomMagasin,
        ];
>>>>>>> a65ad1700c5ff5ecbf7a73ea263923d489260253
    }
}
