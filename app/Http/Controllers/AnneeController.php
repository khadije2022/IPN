<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Http\Requests\StoreAnneeRequest;
use App\Http\Requests\UpdateAnneeRequest;
use App\Http\Resources\AnneeResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AnneesExport;

class AnneeController extends Controller
{
    public function index()
    {
        $query = Annee::query();
        $annees = $query->paginate(10);

        return inertia('Annee/Index', [
            'annees' => AnneeResource::collection($annees),
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return inertia("Annee/Create");
    }

    public function store(StoreAnneeRequest $request)
    {
        $data = $request->all();
        Annee::create($data);

        return to_route('annee.index')->with('success', 'L\'année a été créée avec succès.');
    }

    public function edit(Annee $annee)
    {
        return inertia('Annee/Edit', [
            'annee' => $annee
        ]);
    }

    public function update(UpdateAnneeRequest $request, Annee $annee)
    {
        $data = $request->all();
        $annee->update($data);

        return to_route('annee.index')->with('success', 'L\'année a été mise à jour avec succès.');
    }

    public function destroy(Annee $annee)
    {
        $annee->delete();

        return to_route('annee.index')->with('success', 'L\'année a été supprimée avec succès.');
    }

    public function exportPdf()
    {
        // $annees = Annee::get();
        // $pdf = Pdf::loadView('pdf.annees', ['annees' => $annees]);

        // return $pdf->download('annees.pdf');
    }

    public function exportExcel()
    {
        // return Excel::download(new AnneesExport, 'annees.xlsx');
    }
}
