<?php

namespace App\Http\Controllers;
use App\Http\Resources\MagasinResource;
use App\Models\Magasin;
use App\Http\Requests\StoreMagasinRequest;
use App\Http\Requests\UpdateMagasinRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\MagasinExport;

use Maatwebsite\Excel\Facades\Excel;
class MagasinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Initialize the query builder for the Magasin model
        $query = Magasin::query();


        // Execute the query with pagination
        $magasins = $query->paginate(10);

        // Return the Inertia.js response with the Magasins data and any success message from the session
        return inertia('Magasin/Index', [
            'magasins' => MagasinResource::collection($magasins),
            'success' => session('success'),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Magasin/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMagasinRequest $request)
    {
        $data=$request->all();
        Magasin::create($data);

        return to_route('magasin.index')->with('success','Magasin bien créer');
    }

    /**
     * Display the specified resource.
     */
    public function show(Magasin $magasin)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Magasin $magasin)

    {

        return inertia('Magasin/Edit',[
            'magasin' => $magasin
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMagasinRequest $request, Magasin $magasin)
    {
        $data= $request->all();

        $magasin->update($data);
        return to_route('magasin.index')->with('success','Magasin Bien modifier');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Magasin $magasin)
    {
        $magasin->delete();
        return to_route('magasin.index')->with('success', 'Magasin Bien supprimer');
    }




    public function exportPdf()
    {
        $Magasins = Magasin::get();


        $pdf = Pdf::loadView('pdf.Magasins', ['Magasins' => $Magasins]);



        $pdf = Pdf::loadView('pdf.Magasins', ['Magasins' => $Magasins]);




        return $pdf->download('Magasins.pdf');

    }







    



    public function exportExcel()
    {
        $Magasins = Magasin::get();
        return Excel::download(new MagasinExport, 'Magasin.xlsx');
    }

}
