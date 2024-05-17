<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categorie>
 */
class CategorieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
<<<<<<< HEAD
            'type' => fake()->sentence(),
=======
            'type' => fake()->randomElement(['A4',"Cartoche","Bic"]),
            'parent_id' => 1
>>>>>>> a65ad1700c5ff5ecbf7a73ea263923d489260253
        ];
        
    }
}
