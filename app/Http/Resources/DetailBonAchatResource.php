<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailBonAchatResource extends JsonResource
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
            'quantite' => $this->quantite,
            'produit' => new CatelogueResource($this->produits),
            'prix' => $this->prix,
        //    'magasin' => $this->magasin,
           'idBonAchat' => $this->bonAchat,
        ];
    }
}
