use binding::{
    roman_to_int::roman_to_int,
    find_median_sorted_arrays::{
        find_median_sorted_arrays,
        quick_sort
    }
};
use wasm_bindgen::prelude::wasm_bindgen;

// 快速排序
#[wasm_bindgen(js_name = "quickSort")]
pub fn quick_sort_binding(arr: &mut [i32]) {
    quick_sort(arr);
}

// 罗马数字字符串转数字
#[wasm_bindgen(js_name = "romanToInt")]
pub fn roman_to_int_binding(s: String) -> i32 {
    roman_to_int(s)
}

// 寻找两个正序数组的中位数
#[wasm_bindgen(js_name = "findMedianSortedArrays")]
pub fn find_median_sorted_arrays_binding(arr1: Vec<i32>, arr2: Vec<i32>) -> f64 {
    find_median_sorted_arrays(arr1, arr2)
}