<?php

namespace App\Http\Controllers;

use App\Models\DetailsBorderoDavoi;
use App\Http\Requests\StoreDetailsBorderoDavoiRequest;
use App\Http\Requests\UpdateDetailsBorderoDavoiRequest;
use App\Http\Resources\DetailsBorderoDavoiResource;
use App\Models\BorderoDAvoir;
use App\Models\Manuel;
use Maatwebsite\Excel\Facades\Excel;
// use App\Exports\DetailsBorderoDavoiExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\View;

class DetailsBorderoDavoiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = DetailsBorderoDavoi::query();
        $detailsBorderoDAvoirs = $query->paginate(10);

        return inertia('DetailsBorderoDavoi/Index', [
            'detailsBorderoDAvoirs' => DetailsBorderoDavoiResource::collection($detailsBorderoDAvoirs),
            'success' => session('success'),
        ]);
    }

    public function index_par_bordero($borderoDAvoir)
    {
        $BorderoDAvoir = BorderoDAvoir::findOrFail($borderoDAvoir);
        $detailsBorderoDAvoirs = DetailsBorderoDavoi::where('bordero_d_avoir_id', $borderoDAvoir)->get();
        $manuels = Manuel::all();

        return inertia('DetailsBorderoDavoi/Index-par-BorderoDAvoir', [
            'detailsBorderoDAvoirs' => DetailsBorderoDavoiResource::collection($detailsBorderoDAvoirs),
            'borderoDAvoir' => $borderoDAvoir,
            'BorderoDAvoir' => $BorderoDAvoir,
            'success' => session('success'),
            'manuels' => $manuels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($borderoDAvoir)
    {
        $manuels = Manuel::all();

        return inertia('DetailsBorderoDavoi/Create', [
            'manuels' => $manuels,
            'borderoDAvoir' => $borderoDAvoir
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailsBorderoDavoiRequest $request)
    {
        $data = $request->all();
        DetailsBorderoDavoi::create($data);

        return redirect()->route('DetailsBorderoDavoi.index-par-bordero', ['borderoDAvoir' => $data['bordero_d_avoir_id']])
                         ->with('success', 'Détail de bordereau d\'avoir créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DetailsBorderoDavoi $DetailsBorderoDavoi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailsBorderoDavoi $DetailsBorderoDavoi)
    {
        $manuels = Manuel::all();

        return inertia('DetailsBorderoDavoi/Edit', [
            'DetailsBorderoDavoi' => $DetailsBorderoDavoi,
            'manuels' => $manuels
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailsBorderoDavoiRequest $request, DetailsBorderoDavoi $DetailsBorderoDavoi)
    {
        $data = $request->all();
        $DetailsBorderoDavoi->update($data);

        return redirect()->route('DetailsBorderoDavoi.index-par-bordero', ['borderoDAvoir' => $data['bordero_d_avoir_id']])
                         ->with('success', 'Le détail de bordereau d\'avoir a été mis à jour.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailsBorderoDavoi $DetailsBorderoDavoi)
    {
        $DetailsBorderoDavoi->delete();

        return redirect()->route('DetailsBorderoDavoi.index-par-bordero', ['borderoDAvoir' => $DetailsBorderoDavoi->bordero_d_avoir_id])
                         ->with('success', 'Le détail de bordereau d\'avoir a été supprimé.');
    }

    public function exportPdf($borderoDAvoir)
    {
        
    }

    public function exportExcel($borderoDAvoir)
    {
        
    }
}
