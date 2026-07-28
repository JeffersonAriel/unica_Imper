<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationLabel = 'Especialidades / Serviços';
    protected static ?string $modelLabel = 'Especialidade';
    protected static ?string $pluralModelLabel = 'Especialidades';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Imagem de Fundo do Serviço')
                    ->description('Essa foto aparecerá no fundo do card dessa especialidade no site.')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Nome do Serviço')
                            ->required(),
                        Forms\Components\TextInput::make('slug')
                            ->label('Código Interno (Sem espaços, ex: injecao-quimica)')
                            ->required(),
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Foto de Fundo (Background)')
                            ->image()
                            ->imageEditor()
                            ->directory('services')
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Foto')
                    ->size(50)
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Serviço')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Código')
                    ->badge()
                    ->color('gray'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Editar'),
                Tables\Actions\DeleteAction::make()->label('Excluir'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
