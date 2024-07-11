<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CorrectionStockResource extends JsonResource
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
            'motif' => $this->motif,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'status' => $this->status,
            'createdBy' => new UserResource($this->createdBy),
        ];
    }
}
