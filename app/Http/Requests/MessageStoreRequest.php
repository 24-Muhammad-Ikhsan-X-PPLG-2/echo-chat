<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MessageStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'conversation_id' => ['required'],
            'content' => ['sometimes'],
            'message_type' => ['required'],
            'reply_to' => ['sometimes'],
            'iv' => ['required', 'string'],
            'images' => ['sometimes', 'array', 'nullable'],
            'images.*' => ['image', 'max:10240', 'sometimes', 'nullable']
        ];
    }
}
