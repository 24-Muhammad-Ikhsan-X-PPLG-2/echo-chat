<?php

namespace Database\Seeders;

use App\Models\ConversationMembers;
use App\Models\Conversations;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // Conversations::query()->create([
        //     'type' => 'direct',
        // ]);
        ConversationMembers::query()->create([
            'conversation_id' => '019f2349-2665-71e6-8815-ce53e38548f1',
            'user_id' => '019f233f-6c87-72e3-ba26-6daa2e98c9f3'
        ]);
        ConversationMembers::query()->create([
            'conversation_id' => '019f2349-2665-71e6-8815-ce53e38548f1',
            'user_id' => '019f2344-e008-7056-accc-b28484bf3625'
        ]);
    }
}
