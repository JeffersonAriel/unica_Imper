<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VideoResource\Pages;
use App\Models\Video;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class VideoResource extends Resource
{
    protected static ?string $model = Video::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';
    protected static ?string $navigationLabel = 'Vídeos do Site';
    protected static ?string $modelLabel = 'Vídeo';
    protected static ?string $pluralModelLabel = 'Vídeos do Site';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Configuração do Vídeo')
                    ->description('Adicione vídeos que serão mostrados na seção de vídeo do site.')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Título do Vídeo (Opcional)')
                            ->maxLength(255),
                            
                        Forms\Components\Select::make('type')
                            ->label('Origem do Vídeo')
                            ->options([
                                'youtube' => 'Link do YouTube (Recomendado)',
                                'vimeo' => 'Link do Vimeo',
                                'mp4' => 'Upload de Arquivo (MP4)',
                            ])
                            ->default('youtube')
                            ->required()
                            ->reactive(), // Atualiza a UI quando muda
                            
                        Forms\Components\TextInput::make('video_url')
                            ->label('URL do Vídeo (Cole o link aqui)')
                            ->placeholder('Ex: https://www.youtube.com/watch?v=...')
                            ->visible(fn (callable $get) => in_array($get('type'), ['youtube', 'vimeo'])),
                            
                        Forms\Components\FileUpload::make('file_path')
                            ->label('Arquivo de Vídeo (.mp4)')
                            ->acceptedFileTypes(['video/mp4', 'video/webm'])
                            ->directory('videos')
                            ->visible(fn (callable $get) => $get('type') === 'mp4'),

                        Forms\Components\TextInput::make('order')
                            ->label('Ordem de Exibição')
                            ->numeric()
                            ->default(0),
                            
                        Forms\Components\Toggle::make('is_active')
                            ->label('Ativo?')
                            ->default(true)
                            ->required(),
                    ])->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Título')
                    ->placeholder('Sem Título')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Formato')
                    ->badge()
                    ->colors([
                        'danger' => 'youtube',
                        'info' => 'vimeo',
                        'success' => 'mp4',
                    ]),
                Tables\Columns\TextColumn::make('video_url')
                    ->label('Link')
                    ->limit(30),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Ativo')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Ordem')
                    ->sortable(),
            ])
            ->defaultSort('order', 'asc')
            ->reorderable('order')
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
            'index' => Pages\ListVideos::route('/'),
            'create' => Pages\CreateVideo::route('/create'),
            'edit' => Pages\EditVideo::route('/{record}/edit'),
        ];
    }
}
