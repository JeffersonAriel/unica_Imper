<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryImageResource\Pages;
use App\Models\GalleryImage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GalleryImageResource extends Resource
{
    protected static ?string $model = GalleryImage::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationLabel = 'Galeria de Obras';
    protected static ?string $modelLabel = 'Obra';
    protected static ?string $pluralModelLabel = 'Obras da Galeria';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Imagem da Obra')
                    ->description('Faça o upload da foto. Ela aparecerá automaticamente na home do site.')
                    ->schema([
                        Forms\Components\FileUpload::make('image_path')
                            ->label('Foto')
                            ->image()
                            ->imageEditor()
                            ->directory('gallery')
                            ->required()
                            ->columnSpanFull(),
                            
                        Forms\Components\TextInput::make('title')
                            ->label('Título / Descrição (Opcional)')
                            ->placeholder('Ex: Impermeabilização em Piscina de Condomínio'),
                            
                        Forms\Components\Select::make('span')
                            ->label('Tamanho no Layout (Grid)')
                            ->options([
                                'col-span-2 row-span-1' => 'Retângulo Horizontal (Largo)',
                                'col-span-2 row-span-2' => 'Quadrado Grande',
                            ])
                            ->default('col-span-2 row-span-1')
                            ->required(),

                        Forms\Components\TextInput::make('order')
                            ->label('Ordem de Exibição')
                            ->numeric()
                            ->default(0)
                            ->helperText('Números menores aparecem primeiro (ex: 0, 1, 2)'),
                            
                        Forms\Components\Toggle::make('is_active')
                            ->label('Ativo no Site?')
                            ->default(true)
                            ->required(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Foto')
                    ->size(60)
                    ->square(),
                    
                Tables\Columns\TextColumn::make('title')
                    ->label('Título')
                    ->searchable()
                    ->placeholder('Sem título'),
                    
                Tables\Columns\TextColumn::make('span')
                    ->label('Formato')
                    ->badge()
                    ->color('gray'),
                    
                Tables\Columns\TextColumn::make('order')
                    ->label('Ordem')
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Visível')
                    ->boolean(),
            ])
            ->defaultSort('order', 'asc')
            ->reorderable('order') // Permite arrastar para reordenar!
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
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGalleryImages::route('/'),
            'create' => Pages\CreateGalleryImage::route('/create'),
            'edit' => Pages\EditGalleryImage::route('/{record}/edit'),
        ];
    }
}
