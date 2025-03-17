use binding::roman_to_int::roman_to_int_binding;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn roman_to_int(s: String) -> i32 {
    roman_to_int_binding(s)
}