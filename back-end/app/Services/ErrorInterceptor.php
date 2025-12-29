<?php

namespace App\Services;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use App\Factories\NotificationFactory;
use Throwable;

class ErrorInterceptor
{
    private const HTTP_INTERNAL_SERVER_ERROR = 500;
    public function intercept(Throwable $e, Request $request, Response $response): void
    {
        if (method_exists($response, 'getStatusCode') && $response->getStatusCode() === self::HTTP_INTERNAL_SERVER_ERROR) {
            $enabled = (bool)config('services.microsoft_teams.enabled');
            $errorsUrl = trim((string)config('services.microsoft_teams.errors_url'));
            $cogesUrl = trim((string)config('services.microsoft_teams.coges_url'));
            if (!$enabled || ($errorsUrl === '' && $cogesUrl === '')) {
                return;
            }
            $user = Auth::user();
            $notification = NotificationFactory::make('error_500', [
                'message' => $e->getMessage(),
                'code' => method_exists($e, 'getCode') ? (int)$e->getCode() : self::HTTP_INTERNAL_SERVER_ERROR,
                'method' => $request->method(),
                'url' => $request->fullUrl(),
                'user' => $user ? ($user->nome ?? $user->email ?? (string)$user->id) : '',
            ]);
            if ($notification) {
                $targetUrl = config('services.microsoft_teams.errors_url') ?: config('services.microsoft_teams.coges_url');
                Log::info('ErrorInterceptor: enviando notificação 500', ['url' => $targetUrl]);
                Notification::route('microsoftTeams', $targetUrl)
                    ->notify($notification);
            }
        }
    }
}
