<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailBonAchatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_bon_achats', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->foreignId('produit')->constrained('catelogue_produits')->onDelete('cascade');
            $table->foreignId('idBonAchat')->constrained('bon_achats')->onDelete('cascade');
            $table->float('prix')->default(0);
            $table->timestamps();

            // Ajouter la contrainte d'unicité
            $table->unique(['produit', 'idBonAchat']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('detail_bon_achats', function (Blueprint $table) {
            // Supprimer la contrainte d'unicité avant de supprimer la table
            $table->dropUnique(['produit', 'idBonAchat']);
        });

        Schema::dropIfExists('detail_bon_achats');
    }
}
