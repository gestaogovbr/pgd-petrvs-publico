<?php

namespace App\Notifications\Notifiable;
use Illuminate\Notifications\Notifiable;

class TeamsNotifiable
{
    use Notifiable;

    public function getKey()
    {
        return 1;
    }

    public function routeNotificationForMicrosoftTeams()
    {
        return config('services.microsoft_teams.coges_url');
    }
}
