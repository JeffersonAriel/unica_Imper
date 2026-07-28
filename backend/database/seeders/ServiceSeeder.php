<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => "Injeção\nQuímica", 'slug' => 'injecao-quimica'],
            ['title' => "Poliuretano, industrial\ne antiderrapante", 'slug' => 'poliuretano'],
            ['title' => "Manta asfáltica:\nconvencional\ne autoprotegida", 'slug' => 'manta-asfaltica'],
            ['title' => "Cristalização\ne argamassas\npoliméricas", 'slug' => 'cristalizacao'],
            ['title' => "Retrofit\nde Fachadas", 'slug' => 'retrofit-fachadas'],
            ['title' => "Injeção em\nFissuras", 'slug' => 'injecao-fissuras'],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(['slug' => $service['slug']], $service);
        }
    }
}
