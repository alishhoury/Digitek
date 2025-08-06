<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model {
     protected $fillable = [
        'admin_id',
        'target_id',
        'target',
        'action',
        'changes',
    ];

    protected $casts = [
        'changes' => 'array',
    ];
}
