<?php

use Tests\TestCase;

uses(TestCase::class)->in('app');
uses(Tests\DatabaseTestCase::class)->in('Integration');
uses(Tests\DatabaseTenantTestCase::class)->in('IntegrationTenant');