<?php

namespace App\Http\Controllers;

use App\Models\Titre;
use App\Http\Requests\StoreTitreRequest;
use App\Http\Requests\UpdateTitreRequest;
use App\Http\Resources\TitreResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TitresExport;

class TitreController extends Controller
{
    public function index()
    {
        $query = Titre::query();
        $titres = $query->paginate(10);

        return inertia('Titre/Index', [
            'titres' => TitreResource::collection($titres),
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia("Titre/Create");
    }

    public function store(StoreTitreRequest $request)
    {
        $data = $request->all();
        Titre::create($data);

        return to_route('titre.index')->with('success', 'Le titre a été créé avec succès.');
    }

    public function edit(Titre $titre)
    {
        return inertia('Titre/Edit', [
            'titre' => $titre
        ]);
    }

    public function update(UpdateTitreRequest $request, Titre $titre)
    {
        $data = $request->all();
        $titre->update($data);

        return to_route('titre.index')->with('success', 'Le titre a été mis à jour avec succès.');
    }

    public function destroy(Titre $titre)
    {
        $titre->delete();

        return to_route('titre.index')->with('success', 'Le titre a été supprimé avec succès.');
    }

    public function exportPdf()
    {
       
    }

    public function exportExcel()
    {
        
    }
}
