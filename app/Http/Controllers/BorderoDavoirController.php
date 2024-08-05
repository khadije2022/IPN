<?php

namespace App\Http\Controllers;

use App\Models\BorderoDavoir;
use App\Http\Requests\StoreBorderoDavoirRequest;
use App\Http\Requests\UpdateBorderoDavoirRequest;
use App\Http\Resources\BorderoDavoirResource;
use App\Models\Region;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BorderoDavoirExport;

class BorderoDavoirController extends Controller
{
   
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = BorderoDavoir::query();
        $BorderoDavoirs = $query->paginate(10);

        return inertia('Bordero_d_avoir/Index', [
            'BorderoDavoirs' => BorderoDavoirResource::collection($BorderoDavoirs),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $regions = Region::all();

        return inertia('Bordero_d_avoir/Create', [
            'regions' => $regions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBorderoDavoirRequest $request)
    {
        $data = $request->all();
        BorderoDavoir::create($data);

        return redirect()->route('BorderoDavoir.index')->with('success', 'Le bordereau d\'avoir a été créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BorderoDavoir $BorderoDavoir)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BorderoDavoir $BorderoDavoir)
    {
        $regions = Region::all();

        return inertia('Bordero_d_avoir/Edit', [
            'BorderoDavoir' => $BorderoDavoir,
            'regions' => $regions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBorderoDavoirRequest $request, BorderoDavoir $BorderoDavoir)
    {
        $data = $request->all();
        $BorderoDavoir->update($data);

        return redirect()->route('BorderoDavoir.index')->with('success', 'Le bordereau d\'avoir a été mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BorderoDavoir $BorderoDavoir)
    {
        $BorderoDavoir->delete();
        return redirect()->route('BorderoDavoir.index')->with('success', 'Le bordereau d\'avoir a été supprimé avec succès.');
    }

    public function exportPdf()
    {
        $BorderoDavoirs = BorderoDavoir::get();
        $pdf = Pdf::loadView('pdf.BorderoDavoirs', ['BorderoDavoirs' => $BorderoDavoirs]);
        return $pdf->download('BorderoDavoirs.pdf');
    }

    public function exportExcel()
    {
        return Excel::download(new BorderoDavoirExport, 'BorderoDavoirs.xlsx');
    }
}
