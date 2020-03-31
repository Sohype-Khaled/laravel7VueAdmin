<?php

namespace App\Http\Controllers\Admin;

use App\Activity;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ActivitiyResource;

class ActivitiesController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke()
    {
        return ActivitiyResource::collection(Activity::all());
    }
}
