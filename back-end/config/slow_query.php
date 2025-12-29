<?php

return [

    'enabled' => env('DB_SLOW_QUERY_ENABLED', false),

    'long_query_time' => env('DB_LONG_QUERY_TIME', 1.0),

    'log_queries_not_using_indexes' => env('DB_LOG_NOT_USING_INDEXES', true),

    'min_examined_row_limit' => env('DB_MIN_EXAMINED_ROW_LIMIT', 1000),
];

