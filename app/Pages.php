<?php

namespace App;

use Codtail\Translation\Translator;
use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    use Translator;

    protected $guarded = [];

    protected $attributes = ["translations" => "{}"];

    protected $translatable = ['title', 'descr', 'short_descr'];
}
