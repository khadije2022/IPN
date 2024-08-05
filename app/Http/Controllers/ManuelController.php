<?php

namespace App\Http\Controllers;

use App\Models\Manuel;
use App\Http\Requests\StoreManuelRequest;
use App\Http\Requests\UpdateManuelRequest;
use App\Http\Resources\ManuelResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ManuelsExport;

class ManuelController extends Controller
{
    public function index()
    {
        $query = Manuel::query();
        $manuels = $query->paginate(10);

        return inertia('Manuel/Index', [
            'manuels' => ManuelResource::collection($manuels),
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia("Manuel/Create");
    }

    public function store(StoreManuelRequest $request)
    {
        $data = $request->all();
        Manuel::create($data);

        return to_route('manuel.index')->with('success', 'Le manuel a été créé avec succès.');
    }

    public function edit(Manuel $manuel)
    {
        return inertia('Manuel/Edit', [
            'manuel' => $manuel
        ]);
    }

    public function update(UpdateManuelRequest $request, Manuel $manuel)
    {
        $data = $request->all();
        $manuel->update($data);

        return to_route('manuel.index')->with('success', 'Le manuel a été mis à jour avec succès.');
    }

    public function destroy(Manuel $manuel)
    {
        $manuel->delete();

        return to_route('manuel.index')->with('success', 'Le manuel a été supprimé avec succès.');
    }

    public function exportPdf()
    {
        $manuels = Manuel::get();
        $pdf = Pdf::loadView('pdf.manuels', ['manuels' => $manuels]);

        return $pdf->download('manuels.pdf');
    }

    public function exportExcel()
    {
        return Excel::download(new ManuelsExport, 'manuels.xlsx');
    }
}
