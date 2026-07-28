<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuoteRequestResource\Pages;
use App\Filament\Resources\QuoteRequestResource\RelationManagers;
use App\Models\QuoteRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuoteRequestResource extends Resource
{
    protected static ?string $model = QuoteRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Dados Pessoais e Logística')
                    ->schema([
                        Forms\Components\TextInput::make('name')->label('Nome')->required(),
                        Forms\Components\TextInput::make('email')->label('Email')->email()->required(),
                        Forms\Components\TextInput::make('phone')->label('Telefone')->required(),
                        Forms\Components\TextInput::make('location')->label('Local da Obra'),
                        Forms\Components\TextInput::make('accessibility')->label('Acessibilidade'),
                        Forms\Components\TextInput::make('infrastructure')->label('Infraestrutura (Água/Energia)'),
                    ])->columns(2),
                
                Forms\Components\Section::make('Detalhes da Obra')
                    ->schema([
                        Forms\Components\TextInput::make('area_size')->label('Metragem Quadrada (m²)'),
                        Forms\Components\TextInput::make('geometry')->label('Geometria do Local'),
                        Forms\Components\TextInput::make('surface_type')->label('Tipo de Superfície'),
                        Forms\Components\TextInput::make('thickness')->label('Espessura do Material'),
                        Forms\Components\TextInput::make('purpose')->label('Finalidade'),
                        Forms\Components\TextInput::make('exposure')->label('Exposição'),
                        Forms\Components\Textarea::make('condition')->label('Estado de Conservação')->columnSpanFull(),
                        Forms\Components\Textarea::make('details')->label('Detalhes Construtivos (Cantos, ralos, etc)')->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Mídia e Status')
                    ->schema([
                        Forms\Components\FileUpload::make('photos')
                            ->label('Fotos Anexadas')
                            ->image()
                            ->multiple()
                            ->directory('quotes')
                            ->columnSpanFull(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'novo' => 'Novo',
                                'lido' => 'Lido',
                                'respondido' => 'Respondido',
                            ])
                            ->default('novo')
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Nome')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('Telefone')->searchable(),
                Tables\Columns\TextColumn::make('location')->label('Local'),
                Tables\Columns\TextColumn::make('area_size')->label('Área'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'novo' => 'danger',
                        'lido' => 'warning',
                        'respondido' => 'success',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuoteRequests::route('/'),
            'create' => Pages\CreateQuoteRequest::route('/create'),
            'edit' => Pages\EditQuoteRequest::route('/{record}/edit'),
        ];
    }
}
