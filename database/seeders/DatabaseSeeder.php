<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\User;
use App\Models\Magasin;
use App\Models\CatelogueProduit;
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
            'email' => 'khadi@dkdkd.com',
            'password' => bcrypt('123.321A')
        ]);
        Magasin::factory()->count(30)->create();

        Categorie::factory()
        ->count(30)
        ->has(CatelogueProduit::factory()->count(30),'catalogueProduits')
        ->create();
    }
}
