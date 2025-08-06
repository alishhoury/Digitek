<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\OrderPlaced;
use App\Listeners\LogOrdersPerHour;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        // Manually register events here if needed
    ];

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }

    public function boot(): void
    {
        // Manually register the event listener to avoid duplicates
        Event::listen(OrderPlaced::class, LogOrdersPerHour::class);
    }
}
