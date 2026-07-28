<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Filament\Resources\LeadResource\RelationManagers;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;
    
    // Configurações de exibição no menu lateral
    protected static ?string $navigationIcon = 'heroicon-o-inbox-arrow-down';
    protected static ?string $navigationLabel = 'Contatos do Site (Leads)';
    protected static ?string $modelLabel = 'Contato';
    protected static ?string $pluralModelLabel = 'Contatos do Site';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Dados do Cliente')
                    ->description('Informações de contato preenchidas no site.')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nome Completo')
                            ->disabled(), // Geralmente não editamos o nome que a pessoa enviou
                        Forms\Components\TextInput::make('email')
                            ->label('E-mail')
                            ->email()
                            ->disabled(),
                        Forms\Components\TextInput::make('phone')
                            ->label('Telefone / WhatsApp')
                            ->tel()
                            ->disabled(),
                    ])->columns(3),

                Forms\Components\Section::make('Mensagem e Orçamento')
                    ->schema([
                        Forms\Components\Textarea::make('message')
                            ->label('Mensagem do Cliente')
                            ->rows(5)
                            ->disabled()
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Atendimento')
                    ->description('Atualize o status deste lead para não se perder.')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('Status do Atendimento')
                            ->options([
                                'novo' => 'Novo (Não lido)',
                                'em_andamento' => 'Em Andamento (Respondido)',
                                'concluido' => 'Concluído (Fechado)',
                            ])
                            ->required()
                            ->native(false),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Data')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nome')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Telefone')
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'danger' => 'novo',
                        'warning' => 'em_andamento',
                        'success' => 'concluido',
                    ])
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'novo' => 'Novo',
                        'em_andamento' => 'Em Andamento',
                        'concluido' => 'Concluído',
                        default => $state,
                    }),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Filtrar por Status')
                    ->options([
                        'novo' => 'Novo',
                        'em_andamento' => 'Em Andamento',
                        'concluido' => 'Concluído',
                    ])
            ])
            ->actions([
                Tables\Actions\ViewAction::make()->label('Ler Mensagem'),
                Tables\Actions\EditAction::make()->label('Alterar Status'),
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
            'index' => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit' => Pages\EditLead::route('/{record}/edit'),
        ];
    }
}
