fn get_value(s: &str) -> i32 {
    let result: i32 = match s {
        "原" => 4,
        "神" => 9,
        "启" => 40,
        "动" => 90,
        "蔚" => 400,
        "来" => 900,
        "I" => 1,
        "V" => 5,
        "X" => 10,
        "L" => 50,
        "C" => 100,
        "D" => 500,
        "M" => 1000,
        _ => 0
    };

    result
}

pub fn roman_to_int(s: String) -> i32 {
    // 先弄成数字然后加起来（
    let s = s.replace("IV", "原")
                     .replace("IX", "神")
                     .replace("XL", "启")
                     .replace("XC", "动")
                     .replace("CD", "蔚")
                     .replace("CM", "来");

    let mut result: i32 = 0;

    for char in s.chars() {
        let val_string = char.to_string();
        let val = val_string.as_str();
        result += get_value(val);
    }

    result
}