<?php

namespace App\Http\Controllers;

use App\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GalleriesController extends Controller
{
	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|min:3'
		]);

		if ($validator->fails()) {
			return response($validator->errors(), 422);
		}

		$gallery = Gallery::create([
			'name' => $request->input('name'),
			'user_id' => 1
		]);

		return response($gallery, 201);
	}
}
