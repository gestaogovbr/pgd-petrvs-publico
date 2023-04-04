<?php

namespace App\Handlers;

use Illuminate\Session\DatabaseSessionHandler;

class TenantSessionHandler extends DatabaseSessionHandler
{
    /* *
     * {@inheritdoc}
     *
     * @return string|false
     * /
    #[\ReturnTypeWillChange]
    public function read($sessionId)
    {
        $tenantId = tenant('id');

        
        $query = empty($tenantId) ? parent::getQuery()->whereNull('tenant_id') : parent::getQuery()->where('tenant_id', $tenantId);
        
        
        $session = (object) $query->find($sessionId);

        if ($this->expired($session)) {
            $this->exists = true;

            return '';
        }

        if (isset($session->payload)) {
            $this->exists = true;

            return base64_decode($session->payload);
        }

        return '';
    }*/




    /*
     * {@inheritdoc}
     *
     * @param  string  $data
     * @return array
     *
    protected function getDefaultPayload($data)
    {
        $payload = [
            'payload' => base64_encode($data),
            'last_activity' => $this->currentTime(),
            'tenant_id' => Tenant::current()?->id, //OVERWRITTEN: Added tenant_id
        ];

        if (! $this->container) {
            return $payload;
        }

        return tap($payload, function (&$payload) {
            $this->addUserInformation($payload)
                 ->addRequestInformation($payload);
        });
    }*/

    protected function getQuery()
    {
        $tenantId = tenant('id') ?? "";
        return parent::getQuery()->where('tenant_id', $tenantId);
    }

    protected function addRequestInformation(&$payload)
    {
        $tenantId = tenant('id') ?? "";
        parent::addRequestInformation($payload);
        $payload['tenant_id'] = $tenantId;
        return $this;
    }

}