<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\User;
use App\Models\Magasin;
use App\Models\CatelogueProduit;
use App\Models\ExpressionBesoin;
use App\Models\Service;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'trt',
            'email' => '22013@supnum.mr',
            'password' => bcrypt('37858963'),
            'role' =>'admin'

        ],

    );
        Magasin::factory()->count(1)->create();

        Categorie::factory()->count(30)->create();

        Categorie::factory()
        ->count(3)
        ->has(CatelogueProduit::factory()->count(30),'catalogueProduits')
        ->create();


        Service::factory()
        ->count(3)
        ->has(ExpressionBesoin::factory()->count(30),'expressionbesoins')
        ->create();


    }
}
