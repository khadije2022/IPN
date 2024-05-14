<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Magasin;
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
            'name' => 'INP',
            'email' => 'INP@INP.INP',
            'password' => bcrypt('123.321A')
        ]);
        Magasin::factory()->count(30)->create();
    }
}
