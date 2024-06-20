<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDetailBonSortieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
            return [
            'idBonDeSortie' => 'required|exists:bon_sorties,id',
            'produit' => 'required|exists:catelogue_produits,id',  // Assurez-vous que la table et la clé sont correctes
            'quantite' => 'required|integer|min:1',
        ];
    }
}
