<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDetails_ExpBesoinRequest extends FormRequest
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
            'id_expbesoin' => 'required|exists:expression_besoins,id',
            'produit' => 'required|exists:catelogue_produits,id',  // Assurez-vous que la table et la clé sont correctes
            'quantite' => 'required|integer|min:1',
        ];
    }
}
