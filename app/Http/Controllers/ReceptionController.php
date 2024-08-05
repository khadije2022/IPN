<?php

namespace App\Http\Controllers;

use App\Models\Reception;
use App\Http\Requests\StoreReceptionRequest;
use App\Http\Requests\UpdateReceptionRequest;
use App\Http\Resources\ReceptionResource;

class ReceptionController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Reception::query();
        $receptions = $query->paginate(10);

        return inertia('Reception/Index', [
            'receptions' => ReceptionResource::collection($receptions),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Reception/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceptionRequest $request)
    {
        $data = $request->all();
        Reception::create($data);

        return redirect()->route('reception.index')->with('success', 'La réception a été créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reception $reception)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reception $reception)
    {
        return inertia('Reception/Edit', [
            'reception' => $reception
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceptionRequest $request, Reception $reception)
    {
        $data = $request->all();
        $reception->update($data);

        return redirect()->route('reception.index')->with('success', 'La réception a été mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reception $reception)
    {
        $reception->delete();
        return redirect()->route('reception.index')->with('success', 'La réception a été supprimée avec succès.');
    }

    public function exportPdf()
    {
        $receptions = Reception::get();
        $pdf = Pdf::loadView('pdf.receptions', ['receptions' => $receptions]);
        return $pdf->download('receptions.pdf');
    }

    public function exportExcel()
    {
        return Excel::download(new ReceptionExport, 'receptions.xlsx');
    }
  
}
