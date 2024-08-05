<?php

namespace App\Http\Controllers;

use App\Models\Region;
use App\Http\Requests\StoreRegionRequest;
use App\Http\Requests\UpdateRegionRequest;
use App\Http\Resources\RegionResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RegionsExport;

class RegionController extends Controller
{
    public function index()
    {
        $query = Region::query();
        $regions = $query->paginate(10);

        return inertia('Region/Index', [
            'regions' => RegionResource::collection($regions),
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia("Region/Create");
    }

    public function store(StoreRegionRequest $request)
    {
        $data = $request->all();
        Region::create($data);

        return to_route('region.index')->with('success', 'La région a été créée avec succès.');
    }

    public function edit(Region $region)
    {
        return inertia('Region/Edit', [
            'region' => $region
        ]);
    }

    public function update(UpdateRegionRequest $request, Region $region)
    {
        $data = $request->all();
        $region->update($data);

        return to_route('region.index')->with('success', 'La région a été mise à jour avec succès.');
    }

    public function destroy(Region $region)
    {
        $region->delete();

        return to_route('region.index')->with('success', 'La région a été supprimée avec succès.');
    }

    public function exportPdf()
    {
      
    }

    public function exportExcel()
    {
        
    }
}
