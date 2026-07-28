<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SettingResource extends Resource
{
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Configurações do Site';
    protected static ?string $modelLabel = 'Configuração';
    protected static ?string $pluralModelLabel = 'Configurações do Site';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Editar Configuração')
                    ->description('Altere o valor desta variável para refletir no site.')
                    ->schema([
                        Forms\Components\TextInput::make('key')
                            ->label('Chave (Não alterar)')
                            ->disabled()
                            ->required(),
                            
                        Forms\Components\TextInput::make('description')
                            ->label('O que isso faz?')
                            ->disabled(),

                        // Exibe um campo diferente dependendo do "type" da configuração
                        Forms\Components\Textarea::make('value')
                            ->label('Valor Atual')
                            ->rows(3)
                            ->required(),
                    ])->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('description')
                    ->label('Descrição')
                    ->searchable()
                    ->weight('bold'),
                    
                Tables\Columns\TextColumn::make('value')
                    ->label('Valor Atual')
                    ->limit(50),
                    
                Tables\Columns\TextColumn::make('key')
                    ->label('Variável Interna')
                    ->badge()
                    ->color('gray'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Alterar Valor'),
            ])
            ->bulkActions([
                // Removemos o delete pois as configs são fixas do sistema
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
            // 'create' => Pages\CreateSetting::route('/create'), // Removemos criação para não quebrar o frontend
        ];
    }
}
