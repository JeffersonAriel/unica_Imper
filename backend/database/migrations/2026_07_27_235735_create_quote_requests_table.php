<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            // Dados Pessoais
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            
            // Dados da Área
            $table->string('area_size')->nullable();
            $table->string('geometry')->nullable();
            $table->text('details')->nullable();
            
            // Condições do Substrato
            $table->string('surface_type')->nullable();
            $table->text('condition')->nullable();
            
            // Especificações Técnicas
            $table->string('thickness')->nullable();
            $table->string('purpose')->nullable();
            $table->string('exposure')->nullable();
            
            // Logística
            $table->string('location')->nullable();
            $table->string('accessibility')->nullable();
            $table->string('infrastructure')->nullable();
            
            // Fotos
            $table->json('photos')->nullable();
            
            // Status do Atendimento
            $table->string('status')->default('novo');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
    }
};
