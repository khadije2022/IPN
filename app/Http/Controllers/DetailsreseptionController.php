<?php

namespace App\Http\Controllers;

use App\Models\Detailsreseption;
use App\Http\Requests\StoreDetailsreseptionRequest;
use App\Http\Requests\UpdateDetailsreseptionRequest;
use App\Http\Resources\DetailsreseptionResource;
use App\Models\Reception;
use App\Models\Manuel;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\DetailsreseptionExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;

class DetailsreseptionController extends Controller
{
    /**Detailsreseption
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Detailsreseption::query();
        $detailsReceptions = $query->paginate(10);

        return inertia('Detailsreseption/Index', [
            'detailsReceptions' => DetailsreseptionResource::collection($detailsReceptions),
            'success' => session('success'),
        ]);
    }

    public function index_par_reception($reception)
    {
        $Reception = Reception::findOrFail($reception);
        $detailsReceptions = Detailsreseption::where('reception_id', $reception)->get();
        $manuels = Manuel::all();

        return inertia('Detailsreseption/Index-par-Reception', [
            'detailsReceptions' => DetailsreseptionResource::collection($detailsReceptions),
            'reception' => $reception,
            'Reception' => $Reception,
            'success' => session('success'),
            'manuels' => $manuels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($reception)
    {
        $manuels = Manuel::all();

        return inertia('Detailsreseption/Create', [
            'manuels' => $manuels,
            'reception' => $reception
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailsreseptionRequest $request)
    {
        $data = $request->all();
        Detailsreseption::create($data);

        return redirect()->route('Detailsreseption.index-par-reception', ['reception' => $data['reception_id']])
                         ->with('success', 'Détail de réception créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Detailsreseption $Detailsreseption)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Detailsreseption $Detailsreseption)
    {
        $manuels = Manuel::all();

        return inertia('Detailsreseption/Edit', [
            'Detailsreseption' => $Detailsreseption,
            'manuels' => $manuels
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailsreseptionRequest $request, Detailsreseption $Detailsreseption)
    {
        $data = $request->all();
        $Detailsreseption->update($data);

        return redirect()->route('Detailsreseption.index-par-reception', ['reception' => $data['reception_id']])
                         ->with('success', 'Le détail de réception a été mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Detailsreseption $Detailsreseption)
    {
        $Detailsreseption->delete();

        return redirect()->route('Detailsreseption.index-par-reception', ['reception' => $Detailsreseption->reception_id])
                         ->with('success', 'Le détail de réception a été supprimé.');
    }

    public function exportPdf($reception)
    {
     
    }

    public function exportExcel($reception)
    {

    }
}
