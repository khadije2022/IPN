<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Service;
use App\Models\ExpressionBesoin;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpressionBesoin>
 */
class ExpressionBesoinFactory extends Factory
{
    protected $model = ExpressionBesoin::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_service' => Service::factory(), // Génère un nouveau service ou utilise un existant
            'description' => $this->faker->sentence, // Génère une description aléatoire
            'status' => $this->faker->randomElement(['validé', 'non validé']), // Statut aléatoire
        ];
    }
}
